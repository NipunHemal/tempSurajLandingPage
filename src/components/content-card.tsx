
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ContentCardProps = {
  imageUrl: string;
  imageHint: string;
  tags?: string[];
  title: string;
  description: string;
  link: string;
  paid?: boolean;
  status?: 'free' | 'paid' | 'unpaid';
  price?: number;
  progress?: number;
};

export default function ContentCard({
  imageUrl,
  imageHint,
  tags,
  title,
  description,
  link,
  price,
  progress,
}: ContentCardProps) {

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
          {tags && tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant={tag === 'New' ? 'default' : 'secondary'}
                  className={
                    tag === 'New'
                      ? 'bg-accent text-accent-foreground hover:bg-accent/80'
                      : ''
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <CardTitle className="text-center font-headline text-xl">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
