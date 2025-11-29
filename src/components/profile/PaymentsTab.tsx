
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PaymentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your payment history will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
