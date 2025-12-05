
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ModuleCardProps = {
  imageUrl: string;
  imageHint: string;
  title: string;
  link: string;
};

export default function ModuleCard({
  imageUrl,
  imageHint,
  title,
  link,
}: ModuleCardProps) {
  return (
    <Link href={link} className="flex h-full">
      <Card className="flex w-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="relative p-0">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-center pt-6">
          <CardTitle className="text-center font-headline text-xl">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
