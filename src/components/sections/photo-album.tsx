"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// List of photos
// Adding detailed alt text for better accessibility and context
const photos = [
    {
        src: "/albums/suraj-sir/ER_04422.JPG",
        alt: "Suraj Sir Teaching Session",
        aspectRatio: "aspect-[3/4]",
    },
    {
        src: "/albums/suraj-sir/ER_04481.JPG",
        alt: "Suraj Sir interacting with students",
        aspectRatio: "aspect-[4/3]",
    },
    {
        src: "/albums/suraj-sir/Suraj.png",
        alt: "Suraj Sir Portrait",
        aspectRatio: "aspect-[3/4]",
    },
    {
        src: "/albums/suraj-sir/ER_04497.JPG",
        alt: "Classroom moment",
        aspectRatio: "aspect-[4/3]",
    },
    {
        src: "/albums/suraj-sir/ER_04551.JPG",
        alt: "Suraj Sir explaining concepts",
        aspectRatio: "aspect-[3/4]",
    },
    {
        src: "/albums/suraj-sir/ER_04897-Enhanced-NR-1.JPG",
        alt: "Physics demonstration",
        aspectRatio: "aspect-[4/3]",
    },
    {
        src: "/albums/suraj-sir/ER_04486.JPG",
        alt: "Group discussion",
        aspectRatio: "aspect-[16/9]",
        className: "md:col-span-2", // Spanning specific item
    },
];

export function PhotoAlbum() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="py-24 bg-gradient-to-b from-background to-secondary/10 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            Moments with Suraj Sir
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Capturing the passion, dedication, and inspiring journey of teaching physics.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.src}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-white/10 ${photo.className || ""}`}
                            onClick={() => setSelectedImage(photo.src)}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />

                            {/* Image */}
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/30 backdrop-blur-[2px]">
                                <div className="bg-white/10 border border-white/20 p-3 rounded-full backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-all z-50 focus:outline-none"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl max-h-[90vh] aspect-video md:aspect-auto h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image wrapper
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged view"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
