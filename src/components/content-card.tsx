
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
import { ArrowUpRight, BookOpen, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

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
  const isEnrolled = enrollmentStatus === 'ENROLLED';

  return (
    <Link href={link} className="flex h-full group">
      <Card className="flex w-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 border-border/60 bg-card/50 backdrop-blur-sm">
        <CardHeader className="relative p-0 aspect-[16/9] overflow-hidden">
          <CustomImage
            src={imageUrl}
            fallbackSrc="/placeholder.jpg"
            alt={title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          // data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
            {isEnrolled && (
              <Badge variant="secondary" className="bg-green-500/90 text-white hover:bg-green-600 backdrop-blur-md border-0 shadow-sm">
                <UserCheck className="w-3 h-3 mr-1" /> Enrolled
              </Badge>
            )}
            {tags?.map(tag => (
              <Badge
                key={tag}
                variant={tag === 'New' ? 'default' : 'secondary'}
                className={cn(
                  "backdrop-blur-md shadow-sm border-0",
                  tag === 'New' ? 'bg-primary text-primary-foreground' : 'bg-black/50 text-white hover:bg-black/70'
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <Badge variant={isFree ? 'default' : 'secondary'} className={cn(
              "backdrop-blur-md shadow-sm border-0 font-semibold px-3 py-1",
              isFree ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-white/90 text-black hover:bg-white"
            )}>
              {isFree ? 'Free' : `Rs. ${price?.toLocaleString()}`}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-5 space-y-3">
          <div className="space-y-2">
            <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto">
          <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 hover:text-primary group/btn px-0 hover:px-2 transition-all" size="sm">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              View Details
            </span>
            <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all text-primary" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
