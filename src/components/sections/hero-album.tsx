"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroAlbum() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Abstract Shapes - Tech Feel */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-dashed border-primary/20 rounded-full opacity-30"
            />

            <div className="relative w-full h-full max-w-[500px] flex items-center justify-center">

                {/* 1. Main Portrait (Central Anchor) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-20 w-[60%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <Image
                        src="/albums/suraj-sir/Suraj.png"
                        alt="Suraj S Kumara"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </motion.div>

                {/* 2. Secondary Floating Card (Top Right - Action Shot) */}
                <motion.div
                    initial={{ opacity: 0, x: 50, y: -50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="absolute -top-[10%] -right-[5%] w-[45%] aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/20 z-10"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src="/albums/suraj-sir/ER_04551.JPG"
                            alt="Teaching Action"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    </motion.div>
                </motion.div>

                {/* 3. Tertiary Floating Card (Bottom Left - Professional Context) */}
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="absolute -bottom-[5%] -left-[10%] w-[50%] aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/20 z-30"
                >
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src="/albums/suraj-sir/ER_04897-Enhanced-NR-1.JPG"
                            alt="Professional Context"
                            fill
                            className="object-cover"
                        />
                        {/* Subtle dark gradient for potential text if needed */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                </motion.div>

                {/* Decorative Elements around the Grid */}
                {/* Connecting Lines / Logic Trace */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" viewBox="0 0 100 100" fill="none">
                    <motion.path
                        d="M80 20 L80 40 L60 40"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-primary"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.circle cx="80" cy="20" r="1" className="fill-primary" />
                </svg>

            </div>
        </div>
    );
}
