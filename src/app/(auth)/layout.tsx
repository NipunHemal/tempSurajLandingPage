import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-background lg:flex">
        <Image
          src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg"
          alt="Authentication"
          width={1920}
          height={1080}
          className="h-full w-full rounded-lg object-cover"
          data-ai-hint="binary code"
        />
      </div>
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
