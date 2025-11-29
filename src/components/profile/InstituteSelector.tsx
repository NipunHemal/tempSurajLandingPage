
'use client';

import { useState } from 'react';
import { useGetInstitutes } from '@/service/query/useInstitute';
import { useAssignInstitute } from '@/service/query/useStudent';
import { Institute } from '@/types/api-institute-types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { toast } from 'sonner';

export function InstituteSelector() {
  const { data: institutesResponse, isLoading: isLoadingInstitutes } = useGetInstitutes();
  const { mutate: assignInstitute, isPending: isAssigning } = useAssignInstitute();
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  const handleAssign = () => {
    if (selectedInstitute) {
      assignInstitute({ instituteId: selectedInstitute.id });
    } else {
      toast.warning('Please select an institute to continue.');
    }
  };

  const institutes = institutesResponse?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Institute (Step 2 of 2)</CardTitle>
        <CardDescription>Choose your institute from the list below.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingInstitutes ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ScrollArea className="h-[60vh]">
            <div className="grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 lg:grid-cols-3">
              {institutes.map((institute: Institute) => (
                <Card
                  key={institute.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    selectedInstitute?.id === institute.id && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedInstitute(institute)}
                >
                  <CardContent className="relative flex flex-col items-center gap-4 p-4">
                    <Image
                      src={institute.image}
                      alt={institute.name}
                      width={160}
                      height={120}
                      className="aspect-[4/3] w-full rounded-md object-cover"
                    />
                    <div className="text-center">
                      <h3 className="font-semibold">{institute.name}</h3>
                      <p className="text-xs text-muted-foreground">{institute.location}</p>
                    </div>
                    {selectedInstitute?.id === institute.id && (
                      <div className="absolute right-2 top-2 rounded-full bg-primary p-1 text-primary-foreground">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAssign} className="w-full" disabled={isAssigning || !selectedInstitute}>
          {isAssigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Finish Setup
        </Button>
      </CardFooter>
    </Card>
  );
}
