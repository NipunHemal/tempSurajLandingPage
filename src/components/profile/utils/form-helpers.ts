import * as z from "zod";
import { MetaData } from "@/types/api-meta-types";
import { format } from "date-fns";

// Base validators for specific fields
const baseValidators = {
  firstName: z.string().min(2, { message: "At least 2 characters." }),
  lastName: z.string().min(2, { message: "At least 2 characters." }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD format."),
  role: z.string().min(1, { message: "Required" }),
  phoneNumber: z.string().min(10, { message: "At least 10 digits." }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Required." }),
  // All other fields default to string min(1) if enabled
};

export function createProfileFormSchema(meta: MetaData | null) {
  const shape: Record<string, z.ZodTypeAny> = {};

  if (!meta) {
    // Fallback minimal schema
    return z.object({
      firstName: baseValidators.firstName,
      lastName: baseValidators.lastName,
    });
  }

  // Iterate strictly over metadata fields
  meta.settings.STUDENT_PROFILE.fields.forEach((field) => {
    // Determine validator
    let validator: z.ZodTypeAny = z.string().min(1, { message: "Required" });

    // Use specific validator if available
    if (field.fieldName in baseValidators) {
      validator =
        baseValidators[field.fieldName as keyof typeof baseValidators];
    } else if (field.enum) {
      // Create enum validator dynamically if needed, or just string min 1
      validator = z.string().min(1, { message: "Please select an option." });
    }

    // STRICT LOGIC: isEnabled => Required.
    if (field.isEnabled) {
      shape[field.fieldName] = validator;
    } else {
      // Optional if disabled (or just ignored? existing logic allowed them optional)
      // We'll treat them as optional to avoid issues if they somehow get submitted.
      shape[field.fieldName] = z.string().optional();
    }
  });

  return z.object(shape);
}

export function mapSubmissionData(data: Dictionary<any>): Record<string, any> {
  const payload: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    // Handle Date objects if any (though typically we manage strings)
    if (key === "dob" && value instanceof Date) {
      payload[key] = format(value, "yyyy-MM-dd");
    } else {
      // Map image fields to their specific uploadId keys
      if (key === "profilePicture") {
        payload["profilePictureUploadId"] = value;
      } else if (key === "nicPic") {
        payload["nicPicUploadId"] = value;
      } else if (key === "instituteCardImage") {
        payload["instituteCardImageUploadId"] = value;
      } else {
        payload[key] = value;
      }
    }
  });

  return payload;
}

type Dictionary<T> = Record<string, T>;
