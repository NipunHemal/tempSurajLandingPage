
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ContentCardProps = {
  imageUrl: string;
  imageHint: string;
  tags: string[];
  title: string;
  description: string;
  link: string;
  paid: boolean;
  status?: 'free' | 'paid' | 'unpaid';
};

export default function ContentCard({
  imageUrl,
  imageHint,
  tags,
  title,
  description,
  link,
  paid,
  status,
}: ContentCardProps) {
  const getStatusBadge = () => {
    if (!status) {
      return (
        <Badge 
          className={`absolute right-2 top-2 ${paid ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}
        >
          {paid ? 'Paid' : 'Free'}
        </Badge>
      );
    }
    
    switch (status) {
      case 'free':
        return (
          <Badge className="absolute right-2 top-2 bg-blue-500 text-white">
            Free
          </Badge>
        );
      case 'unpaid':
        return (
          <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">
            Unpaid
          </Badge>
        );
      case 'paid':
        return (
          <Badge className="absolute right-2 top-2 bg-green-500 text-white">
            Paid
          </Badge>
        );
      default:
        return null;
    }
  };
  
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
           {getStatusBadge()}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col pt-6">
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
          <CardTitle className="mb-2 font-headline text-xl">{title}</CardTitle>
          <CardDescription className="flex-1">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
