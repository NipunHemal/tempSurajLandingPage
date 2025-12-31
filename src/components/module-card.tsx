
import CustomImage from '@/components/ui/custom-image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ModuleCardProps = {
  imageUrl: string;
  imageHint: string;
  title: string;
  description: string;
  link: string;
};

export default function ModuleCard({
  imageUrl,
  imageHint,
  title,
  description,
  link,
}: ModuleCardProps) {
  return (
    <Link href={link} className="flex h-full">
      <Card className="flex w-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="relative p-0">
          <CustomImage
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
          // data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4 pt-6">
          <CardTitle className="mb-2 font-headline text-xl">{title}</CardTitle>
          <CardDescription className="flex-1 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
