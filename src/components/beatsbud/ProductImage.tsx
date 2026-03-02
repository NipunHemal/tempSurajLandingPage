"use client";

import React from "react";
import { motion } from "framer-motion";
import { ModernProductSchemaType } from "../../templates/Modern/schema";

interface ProductImageProps {
    data: ModernProductSchemaType;
    isEditable?: boolean;
}

export function BeatsbudProductImage({ data, isEditable }: ProductImageProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 pb-20 mt-12 relative h-screen">
            {/* Soft Background Glow for the Product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 40
                }}
                className="relative z-10 group"
            >
                <img
                    src={data?.image}
                    alt="Premium Beatsbud Headphones"
                    className="w-full max-w-[700px] h-auto object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.7)]"
                    data-editable={isEditable ? "true" : "false"}
                    data-field="product-image"
                    data-type="image"
                />

                {/* Realistic Shadow element */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/60 blur-2xl rounded-full" />
            </motion.div>
        </div>
    );
}
