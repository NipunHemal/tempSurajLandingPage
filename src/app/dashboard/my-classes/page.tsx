
'use client';

import { Search } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';

import DashboardHeader from '@/components/dashboard-header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContentCard from '@/components/content-card';
import { myClasses } from '@/lib/class-data';
import { Input } from '@/components/ui/input';

export default function MyClassesPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find(img => img.id === id);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = useMemo(() => {
    return myClasses.filter(c => {
      return c.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  return (
    <>
      <DashboardHeader title="My Classes" />
      <main className="p-6">
        <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d1202679a5ca?q=80&w=2070&auto=format&fit=crop"
            alt="Search background"
            fill
            className="object-cover"
            data-ai-hint="night sky"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" />
              <Input
                placeholder="Search my classes..."
                className="h-12 w-full rounded-full border-2 border-white/50 bg-transparent pl-12 text-lg text-white placeholder:text-white/80 focus:border-white focus:ring-offset-0"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredClasses.map(card => {
            const image = getImage(card.imageId);
            return (
              <ContentCard
                key={card.id}
                title={card.title}
                description={card.description}
                tags={card.tags}
                link={card.link}
                imageUrl={image?.imageUrl ?? ''}
                imageHint={image?.imageHint ?? ''}
                paid={card.paid}
                status={(card as any).status}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
