/**
 * Deep merge utility to merge props.data with defaultData
 * Props data takes precedence over defaultData
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: (Record<string, any> | undefined)[]
): T {
  if (!sources.length) return target;

  const source = sources.shift();
  if (!source) return deepMerge(target, ...sources);

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        (target as any)[key] = deepMerge(targetValue, sourceValue);
      } else {
        (target as any)[key] = sourceValue;
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Merge provided data with defaults
 * Provided data takes precedence
 */
export function mergeWithDefaults<T extends Record<string, any>>(
  providedData: T | undefined,
  defaultData: T
): T {
  if (!providedData) return defaultData;
  return deepMerge({ ...defaultData }, providedData);
}

/**
 * Generate a unique ID for form fields
 */
export function generateId(prefix = 'lms'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncate string to specified length
 */
export function truncate(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Convert plain text to slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
