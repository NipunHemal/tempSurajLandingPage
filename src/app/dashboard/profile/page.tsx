
'use client';

import DashboardHeader from '@/components/dashboard-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileDetailsTab } from '@/components/profile/ProfileDetailsTab';
import { ProgressTab } from '@/components/profile/ProgressTab';
import { PaymentsTab } from '@/components/profile/PaymentsTab';
import { ExamsTab } from '@/components/profile/ExamsTab';
import { profileTabs } from '@/constants/profile-tabs';

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader title="Profile" />
      <main className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <tab.icon className="mr-2" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="details">
            <ProfileDetailsTab />
          </TabsContent>
          <TabsContent value="progress">
            <ProgressTab />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>
          <TabsContent value="exams">
            <ExamsTab />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
