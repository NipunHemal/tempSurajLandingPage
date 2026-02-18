"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-muted/30 border-t">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight">
                            <span className="text-primary font-serif italic text-3xl">S</span>
                            <span>Suraj S Kumara</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Empowering the next generation of ICT professionals with structured, practical, and result-oriented education.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#classes" className="hover:text-primary transition-colors">Our Classes</Link></li>
                            <li><Link href="#about" className="hover:text-primary transition-colors">About Sir</Link></li>
                            <li><Link href="/login" className="hover:text-primary transition-colors">Student Login</Link></li>
                            <li><Link href="/register" className="hover:text-primary transition-colors">New Registration</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>info@surajskumara.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+94 77 123 4567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primary mt-1" />
                                <span>123 IT Avenue,<br />Colombo 07, Sri Lanka</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to get the latest class schedules and tech news.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 h-10 px-3 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button type="submit" className="h-10 px-4 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90 transition-opacity text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Suraj S Kumara. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
