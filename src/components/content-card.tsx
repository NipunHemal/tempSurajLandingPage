
import CustomImage from '@/components/ui/custom-image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  enrollmentStatus?: 'ENROLLED' | 'NOT_ENROLLED';
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
  enrollmentStatus,
}: ContentCardProps) {
  const isFree = price === 0;

  return (
    <Link href={link} className="flex h-full">
      <Card className="flex w-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="relative p-0">
          <CustomImage
            src={imageUrl}
            fallbackSrc="/placeholder.jpg"
            alt={title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
          // data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {tags && tags.length > 0 && (
            <div className="absolute right-2 top-2 flex flex-wrap gap-2">
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
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4 pt-6">
          <CardTitle className="mb-2 font-headline text-xl">{title}</CardTitle>
          <CardDescription className="flex-1 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Badge variant={isFree ? 'default' : 'destructive'}>
            {isFree ? 'Free' : `Rs. ${price}`}
          </Badge>
          {enrollmentStatus === 'ENROLLED' && (
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400">
              Enrolled
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
