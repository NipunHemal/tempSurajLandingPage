'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    BookOpen,
    Users,
    Award,
    Code2,
    ChevronRight,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { Motion } from '@/components/animation/motion';
import { HeroAlbum } from '@/components/sections/hero-album';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">

            <Navbar />

            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center pt-20 pb-20 lg:pt-0 lg:pb-0">

                    {/* Background Hero Image - Absolute positioned on the right half */}
                    <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60%] h-full z-0 overflow-hidden">
                        <HeroAlbum />
                    </div>

                    <div className="container relative z-10 mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
                        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">

                            {/* Left Content */}
                            <Motion
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 max-w-2xl lg:max-w-none"
                            >
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-extrabold tracking-incredibly-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[1.05]">
                                        Master ICT <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                            Properly.
                                        </span>
                                    </h1>
                                </div>

                                <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl leading-relaxed max-w-[600px]">
                                    Join the most structured ICT program in Sri Lanka.
                                    We simplify complex concepts for A/L & O/L using practical coding.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                                    <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all w-full sm:w-auto" asChild>
                                        <Link href="https://web.surajskumara.lk">
                                            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 w-full sm:w-auto" asChild>
                                        <Link href="#classes">
                                            View Classes
                                        </Link>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-4 text-sm font-medium text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>English & Sinhala Medium</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Online & Physical Classes</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Full Syllabus Coverage</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Practical Coding</span>
                                    </div>
                                </div>
                            </Motion>

                            {/* Right side is empty in grid flow because the image is absolute positioned behind/right */}
                            {/* We keep this empty div to maintain spacing if needed on large screens, or remove it */}
                            <div className="hidden lg:block"></div>
                        </div>
                    </div>
                </section>

                {/* Simplified Stats Strip */}
                <section className="w-full border-y bg-muted/20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
                            {[
                                { label: "Students", val: "2,000+", icon: Users },
                                { label: "Lessons", val: "500+", icon: BookOpen },
                                { label: "Pass Rate", val: "98%", icon: Award },
                                { label: "District Ranks", val: "15+", icon: Award },
                            ].map((stat, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center text-center space-y-1">
                                    <stat.icon className="h-6 w-6 text-primary mb-2 opacity-80" />
                                    <p className="text-3xl font-extrabold text-foreground">{stat.val}</p>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Classes Highlights */}
                <section id="classes" className="w-full py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                                Our <span className="text-primary">Curriculum</span>
                            </h2>
                            <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">
                                Designed to take you from basics to professional engineering concepts.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Theory & Fundamentals",
                                    desc: "Complete coverage of the A/L syllabus with deep-dives into core computing concepts.",
                                    icon: BookOpen
                                },
                                {
                                    title: "Practical Coding",
                                    desc: "Hands-on programming in Python, Java, and Web Technologies. No memorization, just logic.",
                                    icon: Code2
                                },
                                {
                                    title: "Exam Strategy",
                                    desc: "Focused revision sessions, past paper discussions, and time-management techniques.",
                                    icon: Award
                                }
                            ].map((item, idx) => (
                                <Card key={idx} className="group border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50">
                                    <CardHeader>
                                        <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {item.desc}
                                        </p>
                                        <div className="flex items-center text-primary font-bold text-sm cursor-pointer group-hover:translate-x-1 transition-transform">
                                            Learn More <ChevronRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="w-full py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Ready to start your journey?
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Join thousands of successful students who trusted us for their A/L ICT journey.
                            </p>
                            <Button size="lg" className="h-12 px-8 text-lg font-bold shadow-lg" asChild>
                                <Link href="https://web.surajskumara.lk">
                                    Enroll Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
