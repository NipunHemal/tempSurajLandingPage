# Ediflix Landing Template (ediflix-template)

Interactive, beautifully designed, and inline-editable React/Next.js landing page templates.

This package provides pre-built landing page templates that you can render in standard **View Mode** or powerful **Edit Mode**, allowing content creators to update text and images directly on the live page structure.

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install ediflix-template
# or
yarn add ediflix-template
# or
pnpm add ediflix-template
```

## Setup

These templates use Tailwind CSS for styling. For the styles to be applied correctly in your Next.js/Tailwind project, you must tell Tailwind to scan the package files.

Update your `tailwind.config.ts` or `tailwind.config.js`:

```javascript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Add the package path to your content array:
    "./node_modules/ediflix-template/dist/**/*.{js,ts,jsx,tsx,mjs}"
  ],
  theme: {
    // ...
  },
  plugins: [],
} satisfies Config;
```

## Usage

The package exposes a single, unified wrapper component: `EdiflixLandingTemplate`.

### Basic Usage (View Mode)

In view mode (`isEditable={false}`), the template acts strictly as a display component.

```tsx
import { EdiflixLandingTemplate } from "ediflix-template";

export default function MyLandingPage() {
  return (
    <EdiflixLandingTemplate
      template="Natural"
      data={myNaturalData}
      isEditable={false} // Default
    />
  );
}
```

### Advanced Usage (Edit Mode & onSave)

When `isEditable={true}`, the component enables an inline-editing experience:

1. **Text**: Clicking text fields will allow direct editing (contenteditable). Unfocusing the text (`onBlur`) will trigger state updates.
2. **Images**: Clicking an editable image will open the local file selector, immediately converting the selected file to a local preview.
3. **Saving**: Any `onBlur` or image selection event will fire the `onSave` callback with the fully updated data object.

```tsx
"use client"; // Required if using Next.js App Router

import { useState } from "react";
import { EdiflixLandingTemplate } from "ediflix-template";

export default function EditorPage() {
  const [pageData, setPageData] = useState(initialNaturalData);

  const handleSave = (updatedData: any) => {
    console.log("New data from the editor:", updatedData);
    setPageData(updatedData);

    // Optionally: Post to your API to save changes to the database
    // fetch('/api/save-layout', { method: 'POST', body: JSON.stringify(updatedData) });
  };

  return (
    <EdiflixLandingTemplate
      template="Natural"
      data={pageData}
      isEditable={true}
      onSave={handleSave}
    />
  );
}
```

---

## Available Templates & Data Shapes

You control which design renders by passing the literal string to the `template` prop. If `data` is omitted or partially complete, the components will fall back to their internal default data.

### 1. Natural Template

A clean, botanical-themed template initially designed for B2B horticulture.

**Usage:** `template="Natural"`

**Data Structure Sample:**

```javascript
const naturalData = {
  navbar: {
    logoText: "DMS Horticulture",
    logoSubText: "(PVT) LTD",
    links: ["Why Us", "Flowers", "Reviews", "Contact"],
    ctaText: "Get a Quote",
  },
  hero: {
    title: "Premium Flowers",
    description: "Consistent quality and reliable delivery.",
    ctaPrimaryText: "Explore",
    ctaSecondaryText: "Contact",
    stats: [{ label: "Farms", value: "4" }],
    image: "https://example.com/hero.jpg",
    imageBadgeTitle: "Quality Check",
    imageBadgeDesc: "Grading • Picking",
  },
  whyUs: {
    /* ... */
  },
  flowers: {
    /* ... */
  },
  reviews: {
    /* ... */
  },
  contact: {
    /* ... */
  },
};
```

### 2. ClassicView Template

A robust, corporate-style template with grid backgrounds and floating testimonial components.

**Usage:** `template="ClassicView"`

**Data Structure Sample:**

```javascript
const classicData = {
  navbar: {
    logoText: "ServicePro",
    links: [{ label: "Services", href: "#services" }],
    phoneNumber: "1-800-SERVICE",
    ctaText: "Get a Quote",
  },
  hero: {
    title: "Quality Service Guaranteed",
    description: "Professional services for your daily needs.",
    features: ["24/7 Availability", "Licensed Professionals"],
    ctaPrimaryText: "Book Now",
    phoneNumber: "1-800-SERVICE",
  },
  visual: {
    mainImage: "https://example.com/professional.jpg",
  },
  testimonials: [
    {
      content: "Amazing work, highly recommended!",
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
      rating: 5,
    },
  ],
};
```

### 3. Modern Template

A sleek, dark-themed (or vibrant) template perfect for saas/tech products.

**Usage:** `template="Modern"`

**Data Structure Sample:**

```javascript
const modernData = {
  hero: {
    title: "The Future of Tech",
    subtitle: "Build faster and better.",
    ctaText: "Get Started",
  },
  products: [
    {
      id: "prod-1",
      title: "Feature A",
      description: "Does something amazing",
      image: "https://example.com/feature.png",
    },
  ],
  footer: {
    text: "© 2024 Tech Inc.",
  },
};
```

## Props Reference

| Prop         | Type                                     | Default      | Description                                                                           |
| ------------ | ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `template`   | `"Modern" \| "ClassicView" \| "Natural"` | **Required** | Determines which layout is rendered on the screen.                                    |
| `data`       | `Object`                                 | `undefined`  | The content data for the template. If missing, default placeholder data is used.      |
| `isEditable` | `boolean`                                | `false`      | When true, renders the template in Edit Mode allowing inline text and image updates.  |
| `onSave`     | `(data: any) => void`                    | `undefined`  | Callback fired automatically when an inline edit is completed (onBlur/onImageUpload). |

---

**Built by the Ediflix Team.**
