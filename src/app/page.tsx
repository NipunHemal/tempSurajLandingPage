'use client';

import ModernTemplate from "@/templates/Modern";
import { ModernTemplateSchemaType } from "@/templates/Modern/schema";
import { useState } from "react";

export default function LandingPage() {
  const [data, setData] = useState<ModernTemplateSchemaType | undefined>(undefined);

  const handleSave = (updatedData: ModernTemplateSchemaType) => {
    setData(updatedData);
    console.log("✅ Final Saved Data in Pageee:", updatedData);
    alert("Data saved! Check console for JSON.");
  };

  return (
    <ModernTemplate
      data={data}
      isEditable={true}
      onSave={(e) => handleSave(e)}
    />
  );
}
