import { EdiflixLandingTemplate } from '@/index';

export default function LandingPage() {
  return (
    <EdiflixLandingTemplate
      template="Natural"
      data={undefined}
      isEditable={true}
      onSave={(data) => console.log('Saved:', data)}
    />
  );
}
