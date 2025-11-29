
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { InstituteSelector } from '@/components/profile/InstituteSelector';

export default function CompleteProfilePage() {
  const searchParams = useSearchParams();
  const initialStep = searchParams.get('step') === '2' ? 2 : 1;
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    const stepParam = searchParams.get('step');
    const newStep = stepParam === '2' ? 2 : 1;
    setStep(newStep);
  }, [searchParams]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        {step === 1 ? (
          <>
            <h1 className="mb-4 text-center font-headline text-2xl font-bold">Complete Your Profile (Step 1 of 2)</h1>
            <p className="mb-8 text-center text-muted-foreground">Please fill in your details to continue.</p>
            <ProfileForm />
          </>
        ) : (
          <InstituteSelector />
        )}
      </div>
    </div>
  );
}
