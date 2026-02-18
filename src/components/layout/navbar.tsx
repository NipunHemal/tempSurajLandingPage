"use client";

import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <header className="fixed top-0 z-[100] w-full border-b border-white/20 bg-white/5 backdrop-blur-2xl px-4 md:px-6 overflow-hidden shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/10">
            {/* 🪄 Glass Reflection & Gradient Circular Pattern */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* 1. Underlying Dot Pattern - Micro-texture (Smaller & Subtler) */}
                <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:10px_10px] [mask-image:linear-gradient(to_right,black_10%,transparent_80%)]" />

                {/* 2. Glow Spot - Desaturated & Professional (Less Yellow) */}
                <div className="absolute -top-[150px] -left-[100px] w-[600px] h-[400px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-40" />

                {/* 3. Surface Shine for Glass */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60" />
            </div>

            <div className="container mx-auto flex h-20 items-center justify-between relative">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
                >
                    <Image
                        src="/assets/SurajLogo.png"
                        alt="Suraj S Kumara"
                        width={34}
                        height={34}
                        className="h-[34px] w-auto object-contain"
                        priority
                    />
                    <div className="hidden sm:flex flex-col leading-none">
                        <span className="text-base font-extrabold tracking-tight text-foreground">
                            Suraj <span className="text-primary">S Kumara</span>
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.18em] mt-0.5">ICT Academy</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {["Classes", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                        >
                            {item}
                        </Link>
                    ))}
                    <Button asChild className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                        <Link href="/login">Target Login</Link>
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0 text-foreground">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 py-10 px-4">
                                <Link href="/" className="flex items-center gap-2.5 mb-4">
                                    <Image
                                        src="/assets/SurajLogo.png"
                                        alt="Suraj S Kumara"
                                        width={34}
                                        height={34}
                                        className="h-[34px] w-auto object-contain"
                                    />
                                    <div className="flex flex-col leading-none">
                                        <span className="text-base font-extrabold tracking-tight">
                                            Suraj <span className="text-primary">S Kumara</span>
                                        </span>
                                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.18em] mt-0.5">ICT Academy</span>
                                    </div>
                                </Link>
                                <SheetClose asChild>
                                    <Link href="#classes" className="text-lg font-medium py-2 border-b">Classes</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="#about" className="text-lg font-medium py-2 border-b">About</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button asChild className="mt-4 w-full h-12 text-lg">
                                        <Link href="/login">Target Login</Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
