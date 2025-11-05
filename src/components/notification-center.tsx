'use client';
import { useEffect, useState } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

type Urgency = 'high' | 'medium' | 'low';
type Notification = {
  id: number;
  user: string;
  avatarSeed: string;
  message: string;
  timestamp: string;
  urgency: Urgency;
};

const allNotifications: Notification[] = [
  {
    id: 1,
    user: 'Admin',
    avatarSeed: 'admin',
    message:
      'System maintenance is scheduled for tonight at 2 AM. Expect brief downtime.',
    timestamp: '5m ago',
    urgency: 'high',
  },
  {
    id: 2,
    user: 'John S.',
    avatarSeed: 'john',
    message:
      'Your lesson "Advanced React Patterns" has been graded. Great work!',
    timestamp: '1h ago',
    urgency: 'medium',
  },
  {
    id: 3,
    user: 'Jane D.',
    avatarSeed: 'jane',
    message:
      'A new course "Introduction to AI" has been added to your class.',
    timestamp: '3h ago',
    urgency: 'low',
  },
  {
    id: 4,
    user: 'Admin',
    avatarSeed: 'admin2',
    message: 'Please update your profile information before the end of the week.',
    timestamp: '1d ago',
    urgency: 'medium',
  },
  {
    id: 5,
    user: 'System',
    avatarSeed: 'system',
    message:
      'Your password will expire in 7 days. Please consider updating it.',
    timestamp: '2d ago',
    urgency: 'high',
  },
];

const urgencyLevels: Urgency[] = ['high', 'medium', 'low'];

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [urgency, setUrgency] = useState<Urgency>('high');
  const [filteredNotifications, setFilteredNotifications] =
    useState(allNotifications);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!open) return;

    setIsPending(true);
    // Simulate a small delay for filtering, similar to a network request
    const timer = setTimeout(() => {
      const selectedUrgencyIndex = urgencyLevels.indexOf(urgency);
      const newFiltered = allNotifications.filter(
        n => urgencyLevels.indexOf(n.urgency) <= selectedUrgencyIndex
      );
      setFilteredNotifications(newFiltered);
      setIsPending(false);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);

  }, [urgency, open]);

  const getUrgencyColor = (level: Urgency) => {
    switch (level) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative shrink-0 rounded-full">
          <Bell />
          <span className="absolute right-1 top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          <span className="sr-only">Open notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            View and filter your latest notifications.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <Label className="mb-2 block text-sm font-medium">
            Filter by Urgency
          </Label>
          <RadioGroup
            defaultValue="high"
            value={urgency}
            onValueChange={value => setUrgency(value as Urgency)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="r1" />
              <Label htmlFor="r1">High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="r2" />
              <Label htmlFor="r2">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="r3" />
              <Label htmlFor="r3">Low</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="relative flex-1 overflow-auto">
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
              <Loader2 className="animate-spin" />
            </div>
          )}
          <ul className="space-y-4 p-1">
            {filteredNotifications.map(notification => (
              <li key={notification.id} className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarImage
                    src={`https://picsum.photos/seed/${notification.avatarSeed}/40/40`}
                  />
                  <AvatarFallback>
                    {notification.user.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{notification.user}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`block h-2 w-2 rounded-full ${getUrgencyColor(
                          notification.urgency
                        )}`}
                      ></span>
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {!isPending && filteredNotifications.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
                <Bell className="size-12 text-muted-foreground/50"/>
                <p className="mt-4 font-semibold">No notifications</p>
                <p className="text-sm text-muted-foreground">You have no notifications with this urgency level.</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
