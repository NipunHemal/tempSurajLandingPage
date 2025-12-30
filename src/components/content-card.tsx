
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
import { BookOpen, UserCheck, Star, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

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
    <Link href={link} className="flex h-full group focus:outline-none">
      <Card className="flex w-full flex-col overflow-hidden border border-border/40 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-focus:ring-2 group-focus:ring-primary">

        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <CustomImage
            src={imageUrl}
            fallbackSrc="/placeholder.jpg"
            alt={title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay for "Enrolled" State */}
          {isEnrolled && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
              <Badge className="bg-green-500 hover:bg-green-600 text-white border-none px-4 py-1.5 text-sm font-medium shadow-lg">
                <UserCheck className="w-4 h-4 mr-2" /> Enrolled
              </Badge>
            </div>
          )}

          {/* Tags as subtle overlay badges at bottom left */}
          {tags && tags.length > 0 && !isEnrolled && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {tags.slice(0, 2).map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={cn(
                    "text-[10px] px-2 h-5 bg-background/90 text-foreground backdrop-blur-sm border-0",
                    tag === 'New' && "bg-primary text-primary-foreground"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="flex flex-1 flex-col p-4 gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-bold text-base md:text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>

          <CardDescription className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </CardDescription>

          {/* Pseudo-metadata row (Mocking logic since we lack specific props) */}
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center text-amber-500 font-medium">
              <span className="text-amber-600 dark:text-amber-400 font-bold mr-1">4.8</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <span className="text-muted-foreground ml-1 font-normal">(124)</span>
            </div>
            {/* <Separator orientation="vertical" className="h-3" />
             <div className="flex items-center gap-1">
               <BarChart className="w-3 h-3" />
                <span>Beginner</span>
             </div> */}
          </div>
        </CardContent>

        <Separator className="bg-border/40" />

        {/* Footer Section */}
        <CardFooter className="p-4 flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-2">
            <span className={cn("text-lg font-bold", isFree ? "text-green-600 dark:text-green-400" : "text-foreground")}>
              {isFree ? 'Free' : `Rs. ${price?.toLocaleString()}`}
            </span>
            {!isFree && (
              <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                Rs. {price ? (price * 1.2).toLocaleString() : ''}
              </span>
            )}
          </div>

          {!isEnrolled && (
            <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 ml-auto -mr-2">
              Details
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
