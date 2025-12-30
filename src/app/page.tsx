
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  BookOpen,
  Facebook,
  HelpCircle,
  Linkedin,
  Menu,
  MessageSquareQuote,
  PlayCircle,
  Twitter,
  Users,
  Award,
  Target,
  BrainCircuit,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Motion } from '@/components/animation/motion';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="container mx-auto flex h-14 items-center">
          <Link
            href="#"
            className="mr-6 flex items-center gap-2 font-bold"
            prefetch={false}
          >
            <Image src="/logo.png" alt="ELIGHT LMS Logo" width={24} height={24} className="h-6 w-6 text-primary" />
            <span className="text-lg">ELIGHT LMS</span>
          </Link>
          <nav className="hidden flex-1 items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              prefetch={false}
            >
              Classes
            </Link>
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              prefetch={false}
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              prefetch={false}
            >
              Help
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-4 p-6">
                  <Link
                    href="#"
                    className="flex items-center gap-2 font-bold"
                    prefetch={false}
                  >
                    <Image src="/logo.png" alt="ELIGHT LMS Logo" width={24} height={24} className="h-6 w-6 text-primary" />
                    <span>ELIGHT LMS</span>
                  </Link>
                  <SheetClose asChild>
                    <Link
                      href="#"
                      className="block rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      prefetch={false}
                    >
                      Classes
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#"
                      className="block rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      prefetch={false}
                    >
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#"
                      className="block rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
                      prefetch={false}
                    >
                      Help
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Motion as="section" className="w-full border-b py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center gap-6 px-4 text-center md:grid-cols-2 md:gap-10 md:px-6 md:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Unlock Your Potential with Expert Guidance
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Join our comprehensive learning platform and get personalized
                tutoring to achieve your academic goals.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/register">Register Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#">Explore Classes</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-primary-foreground">
                  <Image
                    src="/logo.svg"
                    alt="Elight LMS Logo"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <Image
                src="https://picsum.photos/seed/hero/600/600"
                width="600"
                height="600"
                alt="Hero Visual"
                className="rounded-xl object-cover"
                data-ai-hint="education learning"
              />
            </div>
          </div>
        </Motion>
        <Motion as="section" id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Platform Features
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Everything you need to succeed, all in one place.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Interactive Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Engage with dynamic lessons, quizzes, and assignments that
                    make learning enjoyable.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <PlayCircle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Live Video Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Join live classes with your teacher, ask questions, and
                    collaborate with peers in real-time.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Connect with a community of learners and educators to get
                    help and share your knowledge.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </Motion>
        <Motion as="section" id="process" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How We Build Results
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Our structured approach ensures you build a strong foundation and achieve mastery.
              </p>
            </div>
            <div className="relative mt-12 grid gap-10 md:grid-cols-3">
              <div className="absolute left-1/2 top-8 hidden h-0.5 w-2/3 -translate-x-1/2 bg-border md:block"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-2xl font-bold text-primary">1</div>
                <h3 className="text-xl font-bold">Personalized Assessment</h3>
                <p className="mt-2 text-muted-foreground">We start by understanding your strengths and weaknesses to create a tailored learning plan.</p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-2xl font-bold text-primary">2</div>
                <h3 className="text-xl font-bold">Targeted Instruction</h3>
                <p className="mt-2 text-muted-foreground">You receive focused lessons and practice exercises designed to address your specific needs.</p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-2xl font-bold text-primary">3</div>
                <h3 className="text-xl font-bold">Continuous Feedback</h3>
                <p className="mt-2 text-muted-foreground">Regular feedback and progress tracking help you stay on course and motivated to succeed.</p>
              </div>
            </div>
          </div>
        </Motion>
        <Motion as="section" id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-2 md:gap-12 md:px-6">
            <div className="relative mx-auto w-full max-w-sm">
              <Image
                src="https://picsum.photos/seed/teacher/500/600"
                width={500}
                height={600}
                alt="Teacher"
                className="aspect-[4/5] rounded-xl object-cover"
                data-ai-hint="teacher portrait"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                About Your Teacher
              </h2>
              <h3 className="text-2xl font-semibold text-primary">Jane Doe</h3>
              <p className="text-muted-foreground">
                With over a decade of experience in education, Jane is a
                passionate and dedicated teacher committed to helping students
                excel. She believes in creating a supportive and engaging
                learning environment where every student can thrive.
              </p>
              <ul className="grid gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>M.Sc. in Physics, Stanford University</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>10+ Years of Teaching Experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <span>Specializes in STEM Subjects</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Proven Track Record of Student Success</span>
                </li>
              </ul>
            </div>
          </div>
        </Motion>
        <Motion as="section" id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                What Our Students Say
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Hear from students who have transformed their learning journey
                with us.
              </p>
            </div>
            <Carousel
              opts={{ align: 'start' }}
              className="mx-auto mt-12 w-full max-w-4xl"
            >
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <MessageSquareQuote className="mb-4 h-8 w-8 text-primary" />
                      <p className="flex-1 text-muted-foreground">
                        "The personalized attention and clear explanations made
                        all the difference. I finally understand concepts I've
                        struggled with for years!"
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://picsum.photos/seed/student1/40/40"
                            alt="Student 1"
                          />
                          <AvatarFallback>S1</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Alex Johnson</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <MessageSquareQuote className="mb-4 h-8 w-8 text-primary" />
                      <p className="flex-1 text-muted-foreground">
                        "I love how flexible the platform is. I can learn at my
                        own pace and the live sessions are incredibly helpful."
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://picsum.photos/seed/student2/40/40"
                            alt="Student 2"
                          />
                          <AvatarFallback>S2</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Maria Garcia</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <MessageSquareQuote className="mb-4 h-8 w-8 text-primary" />
                      <p className="flex-1 text-muted-foreground">
                        "My grades have improved significantly since I started.
                        The teacher is amazing and always willing to help."
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://picsum.photos/seed/student3/40/40"
                            alt="Student 3"
                          />
                          <AvatarFallback>S3</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Chen Wei</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Motion>
        <Motion as="section" id="faq" className="w-full border-t py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Have questions? We've got answers.
              </p>
            </div>
            <Accordion type="single" collapsible className="mx-auto mt-12 w-full max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What subjects do you offer?
                </AccordionTrigger>
                <AccordionContent>
                  We offer a wide range of subjects, including Mathematics,
                  Science, English, and History for various grade levels. Check
                  our classes page for a full list.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How are the classes conducted?
                </AccordionTrigger>
                <AccordionContent>
                  Classes are a mix of pre-recorded video lessons, interactive
                  assignments, and live online sessions with the teacher. This
                  blended approach provides flexibility and personalized
                  support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What if I miss a live class?</AccordionTrigger>
                <AccordionContent>
                  No problem! All live sessions are recorded and made available
                  on the platform, so you can watch them anytime at your
                  convenience.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is there a trial period?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 7-day free trial for you to explore our
                  platform and experience our teaching style. No credit card is
                  required to get started.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Motion>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 text-center md:grid-cols-3 md:px-6 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="#"
              className="mb-2 flex items-center gap-2 font-bold"
              prefetch={false}
            >
              <Image src="/logo.png" alt="ELIGHT LMS Logo" width={24} height={24} className="h-6 w-6 text-primary" />
              <span className="text-lg">ELIGHT LMS</span>
            </Link>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ELIGHT LMS. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h4 className="font-semibold">Quick Links</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
              Classes
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
              About Us
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
              Help
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h4 className="font-semibold">Connect with Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
