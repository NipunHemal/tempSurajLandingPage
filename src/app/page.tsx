// import ModernTemplate from '@/templates/Modern';
import { EditorProvider } from '../context/EditorContext';
import { NaturalTemplate } from '@/templates/Natural';
// import { NaturalView } from '@/index';

export default function LandingPage() {
  return (
    <EditorProvider>
      <NaturalTemplate isEditable={true} />
    </EditorProvider>
  );
}
