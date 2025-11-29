
'use client';

import { Search } from 'lucide-react';
import React, { useState, useMemo } from 'react';

import DashboardHeader from '@/components/dashboard-header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ContentCard from '@/components/content-card';
import { availableClasses } from '@/lib/class-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ClassPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find(img => img.id === id);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const filteredClasses = useMemo(() => {
    return availableClasses.filter(c => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterValue === 'all' || c.tags.includes(filterValue);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterValue]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    availableClasses.forEach(c => c.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  return (
    <>
      <DashboardHeader title="Classes" />
      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filterValue === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterValue('all')}
            >
              All
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={filterValue === tag ? 'default' : 'outline'}
                onClick={() => setFilterValue(tag)}
              >
                {tag}
              </Button>
            ))}
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
