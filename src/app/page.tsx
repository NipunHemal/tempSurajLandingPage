
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
    TrendingUp,
    Code2,
    Cpu,
    Globe,
    Video,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Motion } from '@/components/animation/motion';
import { HeroAlbum } from '@/components/sections/hero-album';

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            {/* Global Background Elements */}
            <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
                {/* Radial Dot Pattern - Refined: Denser and slightly larger dots */}
                <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(hsl(var(--primary))_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

                {/* Subtle Vector Icons (Dashboard Style) */}
                <svg className="absolute -right-20 top-[10%] text-primary/5 h-[600px] w-[600px] rotate-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                <svg className="absolute -left-20 top-[40%] text-primary/5 h-[600px] w-[600px] -rotate-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                <svg className="absolute right-[10%] bottom-[5%] text-primary/5 h-[500px] w-[500px] rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
            </div>

            {/* Dynamic Glass Header */}
            <header className="sticky top-0 z-[100] w-full border-b bg-background/80 backdrop-blur-md px-4 md:px-6 overflow-hidden">
                {/* Header Branding Dots - Refined Sync */}
                <div className="absolute inset-0 -z-10 opacity-[0.06] bg-[radial-gradient(hsl(var(--primary))_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

                <div className="container mx-auto flex h-20 items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-3 font-bold transition-transform hover:scale-105"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                            <span className="text-xl text-primary-foreground">S</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl tracking-tight">Suraj S Kumara</span>
                            <span className="text-[10px] font-medium text-primary uppercase tracking-widest">ICT Academy</span>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm font-semibold tracking-tight md:flex">
                        <Link href="#classes" className="hover:text-primary transition-colors">Classes</Link>
                        <Link href="#about" className="hover:text-primary transition-colors">About Sir</Link>
                        <Link href="#resources" className="hover:text-primary transition-colors">Resources</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="hidden font-semibold md:inline-flex hover:bg-primary/10" asChild>
                            <Link href="/login">Portal Login</Link>
                        </Button>
                        <Button className="rounded-full px-8 shadow-lg shadow-primary/20 font-bold transition-all hover:translate-y-[-2px] hover:shadow-xl" asChild>
                            <Link href="/register">Join Now</Link>
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <div className="flex flex-col gap-6 py-10 px-4">
                                    <Link href="/" className="text-2xl font-bold mb-4">Suraj S Kumara</Link>
                                    <SheetClose asChild>
                                        <Link href="#classes" className="text-lg font-medium py-2 border-b">Classes</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="#about" className="text-lg font-medium py-2 border-b">About Sir</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button asChild className="mt-4 w-full h-12 text-lg">
                                            <Link href="/login">Student Login</Link>
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Premium Hero Section */}
                <section className="relative overflow-hidden pt-10 pb-20 md:pt-14 md:pb-40 lg:pt-16 lg:pb-52">
                    {/* Main Background with Tech Grid */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                        <div className="absolute inset-0 tech-grid opacity-20" />
                        <div className="absolute -top-24 -right-24 h-96 w-96 bg-primary/10 rounded-full blur-3xl text-primary" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
                            <Motion className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8">
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary animate-in fade-in slide-in-from-bottom-2">
                                    <span className="relative flex h-2 w-2 mr-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Enrolling for 2026 Batch
                                </div>

                                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-[1.1]">
                                    Master ICT <br />
                                    <span className="text-primary italic relative inline-block group/text">
                                        Properly.
                                        <div className="absolute -bottom-3 left-0 w-full h-[6px]">
                                            <svg className="w-full h-full text-primary" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                {/* Main bold stroke */}
                                                <path d="M0,5 Q50,8 100,5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                                                {/* Tapered secondary stroke for depth */}
                                                <path d="M5,9 Q50,12 95,9" stroke="currentColor" strokeWidth="1.5" fill="transparent" strokeLinecap="round" opacity="0.3" />
                                            </svg>
                                        </div>
                                    </span>
                                </h1>

                                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                                    Experience world-class ICT education with <b>Suraj S Kumara</b>. Simplified concepts, practical coding sessions, and result-oriented training for A/L & O/L students.
                                </p>

                                <div className="flex flex-col w-full sm:flex-row gap-4 pt-4">
                                    <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all group" asChild>
                                        <Link href="/register">
                                            Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-2xl border-2 hover:bg-primary/5 group" asChild>
                                        <Link href="#classes">
                                            View All Classes
                                        </Link>
                                    </Button>
                                </div>

                                <div className="flex items-center gap-8 pt-6">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <Avatar key={i} className="border-4 border-background h-12 w-12">
                                                <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-xs font-bold text-primary-foreground">
                                            +2k
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Trusted by <span className="text-foreground font-bold">2,000+</span> students islandwide.
                                    </p>
                                </div>
                            </Motion>

                            <Motion
                                initial={{ opacity: 0, scale: 0.7, y: 60, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{
                                    duration: 1.4,
                                    delay: 0.3,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="relative mx-auto mt-12 lg:mt-0 w-full max-w-2xl group flex justify-center items-center h-[600px]" // Added fixed height for stability
                            >
                                <HeroAlbum />

                                {/* HUD Elements */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full pointer-events-none z-20">
                                    {/* Pass Rate HUD */}
                                    <div className="absolute top-[5%] -left-[5%] bg-background/60 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-primary/20 animate-bounce-slow pointer-events-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 bg-primary text-primary-foreground flex items-center justify-center rounded-2xl shadow-lg shadow-primary/20">
                                                <TrendingUp className="h-7 w-7" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-1">Success Index</p>
                                                <p className="text-3xl font-black leading-none tracking-tight">98.5% <span className="text-primary text-xs tracking-normal">A+</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Practical HUD */}
                                    <div className="absolute bottom-[5%] -right-[5%] bg-background/60 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-primary/20 animate-float delay-700 pointer-events-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 bg-primary/10 text-primary flex items-center justify-center rounded-2xl border border-primary/20 backdrop-blur-md">
                                                <Code2 className="h-7 w-7" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-1">Lab Status</p>
                                                <p className="text-3xl font-black leading-none tracking-tight">Practical <span className="text-primary text-xs tracking-normal font-medium italic">Logic</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Motion>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="w-full py-10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6 bg-muted/40 rounded-[3rem] border border-white/5 backdrop-blur-sm">
                            {[
                                { label: "Successful Batches", val: "12+", icon: Globe, color: "text-blue-500" },
                                { label: "Hours of Content", val: "500+", icon: Video, color: "text-red-500" },
                                { label: "Active Students", val: "2,000+", icon: Users, color: "text-primary" },
                                { label: "Top Results", val: "A+ Focus", icon: Award, color: "text-amber-500" },
                            ].map((stat, idx) => (
                                <Motion key={idx} transition={{ delay: 0.1 * idx }} className="flex flex-col items-center text-center space-y-2">
                                    <div className={`p-4 rounded-2xl bg-background shadow-md mb-2 ${stat.color}`}>
                                        <stat.icon className="h-7 w-7" />
                                    </div>
                                    <p className="text-3xl font-extrabold">{stat.val}</p>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                </Motion>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Feature Highlights */}
                <section id="classes" className="w-full py-24 lg:py-40">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-6 mb-20">
                            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                Modern <span className="text-primary italic underline underline-offset-8">ICT Architecture</span>
                            </h2>
                            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
                                We don't just teach ICT; we build the next generation of technologists using a structured, futuristic curriculum.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "Programming Mastery",
                                    desc: "Deep dive into Python, Java, and Pascal. Real-time coding marathons with error analysis.",
                                    icon: Code2,
                                    bg: "bg-blue-500/5",
                                    border: "border-blue-500/10"
                                },
                                {
                                    title: "Network Engineering",
                                    desc: "Understanding the OSI model, IP addressing, and secure networking architectures with live labs.",
                                    icon: Cpu,
                                    bg: "bg-red-500/5",
                                    border: "border-red-500/10"
                                },
                                {
                                    title: "Web & Future Tech",
                                    desc: "Learn modern web development, IoT basics, and how the global information systems operate.",
                                    icon: Globe,
                                    bg: "bg-green-500/5",
                                    border: "border-green-500/10"
                                }
                            ].map((item, idx) => (
                                <Motion
                                    key={idx}
                                    transition={{ delay: 0.2 * idx }}
                                    className={`group relative p-8 rounded-[2.5rem] border ${item.border} ${item.bg} hover:bg-background hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <item.icon className="h-32 w-32" />
                                    </div>
                                    <div className="mb-8 p-5 bg-background rounded-3xl shadow-lg w-fit group-hover:scale-110 group-hover:shadow-primary/20 transition-all">
                                        <item.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                    <Link href="/register" className="inline-flex items-center font-bold text-primary group-hover:gap-2 transition-all">
                                        Enroll Now <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Motion>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="w-full py-24 lg:py-40 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <Motion className="space-y-8">
                                <div className="inline-flex items-center text-primary font-bold tracking-widest uppercase text-sm">
                                    <div className="h-px w-8 bg-primary mr-3" /> The Instructor
                                </div>
                                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                    Leading the <br /> <span className="text-primary italic">ICT Revolution</span>
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Suraj S Kumara is a renowned ICT specialist and educator with over <b>15 years of industry experience</b>. Known for his "Logic First" teaching style, he has successfully guided thousands of students to secure 'A' passes in the G.C.E A/L ICT stream.
                                </p>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {[
                                        { icon: Award, label: "University Lecturer (Former)" },
                                        { icon: Target, label: "ICT Syllabus Committee Member" },
                                        { icon: BrainCircuit, label: "Specialist in Logic Design" },
                                        { icon: TrendingUp, label: "Top Result Producer Since 2012" }
                                    ].map((usp, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <usp.icon className="h-5 w-5" />
                                            </div>
                                            <span className="font-bold text-sm tracking-tight">{usp.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" className="rounded-2xl h-14 px-10 font-bold" asChild>
                                    <Link href="/about">Learn More About Suraj</Link>
                                </Button>
                            </Motion>

                            <Motion transition={{ delay: 0.3 }} className="relative">
                                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-3xl transform -rotate-6" />
                                <div className="relative aspect-video rounded-[3rem] bg-background border-4 border-background shadow-2xl overflow-hidden group">
                                    {/* Video Placeholder/Thumbnail */}
                                    <Image
                                        src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
                                        alt="Classroom"
                                        width={1280}
                                        height={720}
                                        className="object-cover h-full w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button variant="outline" size="icon" className="h-24 w-24 rounded-full border-4 bg-background/50 backdrop-blur hover:scale-110 transition-transform shadow-2xl">
                                            <PlayCircle className="h-12 w-12 text-primary" />
                                        </Button>
                                    </div>
                                </div>
                            </Motion>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="w-full py-24 lg:py-40">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-6 mb-20">
                            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                Student <span className="text-primary italic">Wall of Fame</span>
                            </h2>
                            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
                                Success stories from our past students who are now shining in top engineering and IT faculties.
                            </p>
                        </div>

                        <Carousel opts={{ align: 'start' }} className="w-full max-w-6xl mx-auto">
                            <CarouselContent>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 p-4">
                                        <Card className="h-full border-none shadow-soft overflow-hidden group bg-muted/20">
                                            <CardContent className="p-8 flex flex-col justify-between h-full">
                                                <MessageSquareQuote className="h-10 w-10 text-primary/20 mb-6 group-hover:text-primary transition-colors" />
                                                <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                                                    "Sir's explanation of networking was so logic-based that I never had to memorize it. Best decision for my A/Ls!"
                                                </p>
                                                <div className="flex items-center gap-4 border-t pt-6 border-white/5">
                                                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                                                        <AvatarImage src={`https://i.pravatar.cc/150?u=s${i}`} />
                                                        <AvatarFallback>ST</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-extrabold">Student Name {i}</p>
                                                        <p className="text-xs font-bold text-primary uppercase">Mora Engineering</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="mt-12 flex justify-center gap-4">
                                <CarouselPrevious className="static translate-y-0 h-12 w-12" />
                                <CarouselNext className="static translate-y-0 h-12 w-12" />
                            </div>
                        </Carousel>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-24 pb-40">
                    <div className="container mx-auto px-4 md:px-6">
                        <Motion className="relative overflow-hidden rounded-[4rem] bg-primary p-12 md:p-24 text-primary-foreground text-center space-y-8">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter max-w-4xl mx-auto leading-tight">
                                Your Future in Tech <br /> Starts <span className="opacity-60 italic underline">Today.</span>
                            </h2>
                            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
                                Enroll now for the 2026 Batch and secure your path to a top university. Limited seats available for physical & online sessions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                                <Button size="lg" className="h-16 px-12 text-xl font-black bg-background text-primary hover:bg-background/90 rounded-3xl shadow-xl shadow-black/10 transition-transform hover:scale-105" asChild>
                                    <Link href="/register">Create Your Account</Link>
                                </Button>
                                <Button size="lg" className="h-16 px-12 text-xl font-black bg-background/20 backdrop-blur-md border-2 border-background text-background hover:bg-background hover:text-primary rounded-3xl transition-all hover:scale-105" asChild>
                                    <Link href="/contact">Speak with a Consultant</Link>
                                </Button>
                            </div>
                        </Motion>
                    </div>
                </section>
            </main>

            <footer className="w-full border-t bg-muted/50 py-20">
                <div className="container mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-4 md:px-6">
                    <div className="flex flex-col space-y-6 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">S</div>
                            Suraj S Kumara
                        </Link>
                        <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                            The premium ICT learning destination for ambitious students. Empowering minds with logic, code, and professional ethics since 2012.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="h-12 w-12 rounded-xl bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-lg font-extrabold tracking-tight">Main Hub</h4>
                        <nav className="flex flex-col gap-4 font-semibold text-muted-foreground">
                            {["All Classes", "Success Stories", "LMS Portal", "Help Center"].map((l, i) => (
                                <Link key={i} href="#" className="hover:text-primary transition-colors hover:translate-x-1 duration-300">{l}</Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-lg font-extrabold tracking-tight">Direct Contact</h4>
                        <div className="space-y-4 text-muted-foreground font-semibold">
                            <p>Hotline: +94 71 234 5678</p>
                            <p>Email: classes@surajsir.lk</p>
                            <p className="text-sm">Main Branch: Colombo 07, Sri Lanka</p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-muted-foreground">
                        &copy; {new Date().getFullYear()} Suraj S Kumara ICT Academy.
                        <span className="font-medium opacity-50 ml-2">Designed for Excellence.</span>
                    </p>
                    <div className="flex gap-8 text-sm font-bold text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors text-xs uppercase tracking-widest">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors text-xs uppercase tracking-widest">Terms of Use</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
