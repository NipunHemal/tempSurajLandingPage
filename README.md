# ediflix-template

A professional landing page template with an integrated editor.

## Installation

```bash
npm install ediflix-template
```

## Usage

### 1. Import Styles

Import the library styles in your main entry point (e.g., `layout.tsx` or `_app.tsx`):

```tsx
import "ediflix-template/dist/styles.css";
```

### 2. Implementation

```tsx
import { ModernTemplate, EditorProvider } from "ediflix-template";

export default function Page() {
  return (
    <EditorProvider>
      <ModernTemplate isEditable={true} />
    </EditorProvider>
  );
}
```
