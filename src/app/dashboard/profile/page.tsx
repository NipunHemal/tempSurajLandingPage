
'use client';

import {
  FileText,
  CreditCard,
  BarChart,
  User
} from 'lucide-react';

import DashboardHeader from '@/components/dashboard-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileDetailsTab } from '@/components/profile/ProfileDetailsTab';

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader title="Profile" />
      <main className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger value="details">
              <User className="mr-2" /> Profile Details
            </TabsTrigger>
            <TabsTrigger value="progress">
              <BarChart className="mr-2" /> Progress
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="mr-2" /> Payments
            </TabsTrigger>
            <TabsTrigger value="exams">
              <FileText className="mr-2" /> Exams
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ProfileDetailsTab />
          </TabsContent>
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Your academic progress will be shown here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
                <CardDescription>Your payment history will be shown here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>Exams</CardTitle>
                <CardDescription>Your exam results and schedules will be shown here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
