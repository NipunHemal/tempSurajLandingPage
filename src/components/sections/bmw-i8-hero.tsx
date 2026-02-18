"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BMWi8HeroProps {
    imagePath?: string;
}

export function BMWi8Hero({ imagePath = "/bmw_i8_hero_v2.png" }: BMWi8HeroProps) {
    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden lg:overflow-visible">
            {/* 🪄 Abstract Glow Behind the Car */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, x: "100%", scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 12,
                    mass: 1,
                    delay: 0.1
                }}
                className="relative z-10 w-full max-w-[600px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            >
                {/* 🚗 The Car Asset */}
                <motion.div
                    animate={{
                        y: [0, -3, 0],
                        rotate: [0, 0.2, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-full aspect-[16/9]"
                >
                    <Image
                        src={imagePath}
                        alt="BMW i8"
                        fill
                        className="object-contain pointer-events-none"
                        priority
                    />

                    {/* ⚙️ Spinning Wheels (Subtle Motion Blur Overlays) */}
                    {/* Front Wheel Area */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="absolute bottom-[10.5%] left-[13%] w-[16%] h-[28%] z-20 pointer-events-none flex items-center justify-center overflow-hidden"
                    >
                        {/* Faster, darker spin with more blur for a "motion" look rather than a literal circle */}
                        <div className="w-[90%] h-[90%] rounded-full border-[3px] border-dashed border-black/20 animate-[spin_0.03s_linear_infinite] blur-[3px]" />
                        <div className="absolute inset-0 rounded-full bg-black/10 backdrop-blur-[1px]" />
                    </motion.div>

                    {/* Rear Wheel Area */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="absolute bottom-[7.5%] right-[30.5%] w-[15.5%] h-[26%] z-20 pointer-events-none flex items-center justify-center overflow-hidden"
                    >
                        <div className="w-[90%] h-[90%] rounded-full border-[3px] border-dashed border-black/20 animate-[spin_0.03s_linear_infinite] blur-[3px]" />
                        <div className="absolute inset-0 rounded-full bg-black/10 backdrop-blur-[1px]" />
                    </motion.div>

                    {/* ✨ Subtle Animated Headlight Glows - More Narrow & Blurred */}
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scaleX: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[47%] left-[8%] w-[10%] h-[5%] bg-primary/20 blur-2xl rounded-[100%]"
                    />
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scaleX: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute top-[45%] right-[37%] w-[8%] h-[4%] bg-primary/20 blur-2xl rounded-[100%]"
                    />
                </motion.div>
            </motion.div>

            {/* 💠 Circular Pattern Accent */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.1] bg-[radial-gradient(hsl(var(--primary))_2px,transparent_2px)] [background-size:24px_24px] rounded-full blur-sm -z-10" />
        </div>
    );
}
