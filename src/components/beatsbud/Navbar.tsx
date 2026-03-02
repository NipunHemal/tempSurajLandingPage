"use client";

import React from "react";
import { Button } from "../ui/button";
import { Headphones } from "lucide-react";

export function BeatsbudNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Headphones className="w-5 h-5 text-white fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter">Beatsbud</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <a href="#" className="hover:text-white transition-colors">Home</a>
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Download</a>
                    <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                </div>

                <Button
                    variant="outline"
                    className="rounded-full border-white/20 bg-transparent hover:bg-white hover:text-black transition-all"
                >
                    Download Now
                </Button>
            </div>
        </nav>
    );
}
