"use client";

import React from "react";
import { BeatsbudNavbar } from "../../components/beatsbud/Navbar";
import { BeatsbudHero } from "../../components/beatsbud/Hero";
import { BeatsbudProductImage } from "../../components/beatsbud/ProductImage";
import { ModernTemplateSchemaType } from "./schema";

interface ViewProps {
    data: ModernTemplateSchemaType;
    isEditable?: boolean;
}

export function View({ data, isEditable }: ViewProps) {
    return (
        <main className="flex flex-col items-center bg-[#0a0a0a] text-white overflow-y-auto relative font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-beats-grid pointer-events-none opacity-40" />
            <div className="absolute inset-0 bg-beats-gradient pointer-events-none" />

            {/* Animated Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <BeatsbudNavbar />

            <div className="flex-1 flex flex-col w-full relative">
                <BeatsbudHero data={data.hero} isEditable={isEditable} />
                <BeatsbudProductImage data={data.product} isEditable={isEditable} />
            </div>

            {/* Subtle Bottom Glow behind phones */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30vh] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none z-0" />
        </main>
    );
}
