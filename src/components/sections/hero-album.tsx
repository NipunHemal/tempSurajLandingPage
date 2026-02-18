"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
    { src: "/albums/suraj-sir/Suraj.png",                  alt: "Suraj S Kumara" },
    { src: "/albums/suraj-sir/ER_04551.JPG",               alt: "Classroom" },
    { src: "/albums/suraj-sir/ER_04497.JPG",               alt: "Lecture" },
    { src: "/albums/suraj-sir/ER_04546.JPG",               alt: "Programming" },
    { src: "/albums/suraj-sir/ER_04897-Enhanced-NR-1.JPG", alt: "Award" },
];

export function HeroAlbum() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full select-none overflow-hidden relative">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[index].src}
                        alt={slides[index].alt}
                        fill
                        className="object-cover object-center lg:object-[center_20%]"
                        priority={index === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Premium Gradient Overlay: Fades the image into the background from the left */}
            {/* The mask-image approach is cleaner for "fading away" than opacity gradients */}
            <div 
                className="absolute inset-0 bg-background/20 z-10"
                style={{
                    background: 'linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background)) 5%, transparent 60%)'
                }} 
            />
            
            {/* Bottom fade for mobile */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent lg:hidden z-10" />
        </div>
    );
}
