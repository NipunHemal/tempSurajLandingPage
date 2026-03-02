# Developer Guide: Ediflix Landing Template (ediflix-template)

Welcome to the documentation for contributing to and maintaining the `ediflix-template` npm package. This guide covers the application architecture, how the inline-editing system works, how to add new templates, and the build & publish pipeline.

---

## 1. Application Architecture

The `ediflix-template` codebase serves a dual purpose:

1. **A standard Next.js application** (`src/app/page.tsx`) for local testing, development, and viewing templates in real-time.
2. **An npm package library** compiled via `tsup` and `tailwindcss` which exports a single, unified Wrapper Component (`EdiflixLandingTemplate`) alongside the templates, context providers, and schemas.

### Core Structure

```text
d:\Temp\surajLanding3.0\tempSurajLandingPage\
├── src/
│   ├── app/                    # Next.js App Router for local development/testing
│   ├── components/             # Reusable UI components
│   ├── context/
│   │   └── EditorContext.tsx   # React Context governing global edit state and onSave
│   ├── templates/              # Directory containing all landing page UI templates
│   │   ├── ClassicView/
│   │   ├── Modern/
│   │   └── Natural/
│   ├── EdiflixLandingTemplate.tsx  # The main unified exporting Switch component
│   └── index.ts                 # The primary entry point for the npm package
├── tsup.config.ts              # Configuration for compiling TypeScript to JS/ESM
├── tsconfig.package.json       # Strict TS config used exclusively for the npm build
└── package.json                # Defines package scripts, dependencies, and versions
```

### The Inline Editing System (`EditorContext.tsx`)

The inline editing magic is managed globally by the `EditorProvider`.

- **Text Elements:** To make text editable, we use HTML's native `contentEditable` behavior conditionally via `data-editable={isEditable}`. We also apply `suppressContentEditableWarning={true}`. When a user unfocuses a block of text, an `onBlur` event fires, which captures the `innerText` and sends it to the component's state, updating the JSON data object.
- **Images:** Image editing is handled via `onClick` events. When an image is clicked while `isEditable` is true, the browser's native File Selector (`<input type="file" />`) is programmatically triggered. The selected file is read via `FileReader` as a Base64 data URL and replaces the image `src`.
- When changes occur, the template wrapper updates its local state and syncs with `EditorContext`, eventually triggering the `onSave` callback provided by the consuming developer.

---

## 2. Managing and Adding Templates

All templates follow a strict structural pattern. If you want to add a new template (e.g., `CorporateView`), follow these exact steps:

### Step 1: Create the Directory Structure

Create a new folder: `src/templates/CorporateView/`.

### Step 2: Define the Schema (`schema.ts`)

Define the expected JSON structure using `zod`. This ensures type safety for the user.

```typescript
import { z } from "zod";
export const CorporateSchema = z.object({
  hero: z.object({
    title: z.string(),
    description: z.string(),
  }),
});
export type CorporateSchemaType = z.infer<typeof CorporateSchema>;
```

### Step 3: Define Default Data (`defaultData.ts`)

Create fallback placeholder content matching your schema.

```typescript
import { CorporateSchemaType } from "./schema";
export const defaultCorporateData: CorporateSchemaType = {
  hero: { title: "Welcome", description: "Hello world" },
};
```

### Step 4: Build the User Interface (`CorporateView.tsx`)

Build the visual layout using Tailwind CSS.
Expose an `onUpdate` prop to bubble up data edits. Connect every editable `div`, `h1`, `p`, or `img` to the `onUpdate` function.

```tsx
<h1
  data-editable={isEditable}
  data-field="hero-title"
  suppressContentEditableWarning={true}
  onBlur={(e) => onUpdate("hero", "title", e.currentTarget.innerText)}
>
  {data.hero.title}
</h1>
```

### Step 5: Build the State Wrapper (`Template.tsx`)

Create a wrapper that manages `useState` for the data, deep-merges the incoming data with the default data, and passes the `handleUpdate` function down to the view.

### Step 6: Export the Template

1. Create `src/templates/CorporateView/index.ts` and `export * from './Template'`, `schema`, etc.
2. Update `src/index.ts` to export your new Schema and Wrapper.
3. **Crucial:** Update `src/EdiflixLandingTemplate.tsx`:
   - Add `'CorporateView'` to the `TemplateType` union.
   - Adjust the `switch(template)` statement to import and render `<CorporateTemplate />`.

### Step 7: Update Build Configuration

Open `tsconfig.package.json` and append the new directory to the `include` array so `tsup` knows to compile it:

```json
"include": [
  "src/index.ts",
  "src/EdiflixLandingTemplate.tsx",
  "src/templates/CorporateView/**/*"
]
```

---

## 3. Local Testing and Development

To test the application and view components while developing:

```bash
npm run dev
```

This starts the Next.js development server at `http://localhost:3000`.
To test a specific template, simply open `src/app/page.tsx` and change the `template` prop.

```tsx
import { EdiflixLandingTemplate } from "@/index";

export default function LandingPage() {
  return (
    <EdiflixLandingTemplate
      template="Natural" // Change this to inspect different templates
      data={undefined}
      isEditable={true}
      onSave={(data) => console.log("Saved:", data)}
    />
  );
}
```

---

## 4. Building the Application

When a component is ready, you must compile the React code into Vanilla JS/ESM modules and minify the Tailwind CSS.

**To build everything at once:**

```bash
npm run build:package
```

Under the hood, this executes two separate scripts:

1. **`npm run build:lib`**: Uses `tsup` with the `tsconfig.package.json` configuration to compile the typescript files specified in the `include` array into the `dist/` output folder. It creates `.js` (CommonJS), `.mjs` (ES Modules), and `.d.ts` (Type Definitions).
2. **`npm run build:css`**: Uses the Tailwind CLI to parse all `.tsx` files in the `content` array (inside `tailwind.config.ts`) and compiles a highly minified single sheet of CSS (`dist/styles.css`).

---

## 5. Publishing to npm

Once built, you can publish the updated package to the npm registry.

1. **Bump the Version:** Update the `"version": "x.x.x"` string in `package.json`. Follow Semantic Versioning requirements (MAJOR.MINOR.PATCH).
2. **Commit changes:** Push your updated code and version bump to your version control (Git).
3. **Build:** Always ensure your `dist` folder is up to date.
   ```bash
   npm run build:package
   ```
4. **Publish:** Publish the module publicly.
   ```bash
   npm publish --access public
   ```

_(Note: Ensure you are logged into your npm account via the CLI using `npm login` before publishing.)_
