"use client";

import React from "react";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ModernHeroSchemaType } from "../../templates/Modern/schema";

interface HeroProps {
    data: ModernHeroSchemaType;
    isEditable?: boolean;
}

export function BeatsbudHero({ data, isEditable }: HeroProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-12 relative z-10 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8"
            >
                <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    ))}
                    <Star className="w-3.5 h-3.5 text-yellow-500/50 fill-current" />
                </div>
                <span
                    className="text-xs font-semibold text-zinc-300"
                    data-editable={isEditable ? "true" : "false"}
                    data-field="hero-badge"
                >
                    {data?.badge}
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[0.9] flex flex-col items-center"
            >
                <span data-editable={isEditable ? "true" : "false"} data-field="hero-title">{data?.title}</span>
                <span
                    className="text-zinc-500"
                    data-editable={isEditable ? "true" : "false"}
                    data-field="hero-titleAccent"
                >
                    {data?.titleAccent}
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed"
                data-editable={isEditable ? "true" : "false"}
                data-field="hero-description"
            >
                {data?.description}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Button
                    size="lg"
                    className="bg-primary hover:bg-red-700 text-white rounded-full px-10 py-7 text-lg font-bold group"
                >
                    <Play className="w-5 h-5 mr-3 fill-current group-hover:scale-110 transition-transform" />
                    <span
                        data-editable={isEditable ? "true" : "false"}
                        data-field="hero-ctaText"
                    >
                        {data?.ctaText}
                    </span>
                </Button>
            </motion.div>
        </div>
    );
}
