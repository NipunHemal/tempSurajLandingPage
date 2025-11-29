
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ExamsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Exams</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your exam results and upcoming exams will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
