'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, Check, Star } from 'lucide-react';
import { ClassicViewSchemaType } from './schema';

interface ClassicViewProps {
    data: ClassicViewSchemaType;
    isEditable?: boolean;
    onUpdate?: (section: string, field: string, value: any) => void;
}

export default function ClassicView({ data, isEditable, onUpdate }: ClassicViewProps) {

    const handleBlur = (section: string, field: string) => (e: React.FocusEvent<HTMLElement>) => {
        if (onUpdate) {
            onUpdate(section, field, e.currentTarget.innerText);
        }
    };

    const handleImageClick = (section: string, field: string) => (e: React.MouseEvent) => {
        if (isEditable) {
            e.stopPropagation();
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                if (file && onUpdate) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        onUpdate(section, field, reader.result as string);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        }
    };


    return (
        <div className="relative h-screen w-full overflow-hidden bg-white text-slate-900 font-sans selection:bg-blue-100">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{
                    backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-4 md:px-16 bg-white/80 backdrop-blur-sm border-b border-slate-100">
                <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-600">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Check className="h-5 w-5 stroke-[3px]" />
                    </div>
                    <span data-editable={isEditable} data-field="navbar-logoText" suppressContentEditableWarning={true} onBlur={handleBlur('navbar', 'logoText')}>
                        {data.navbar.logoText}
                    </span>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    {data.navbar.links.map((link, i) => (
                        <a key={i} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden lg:flex items-center gap-2 text-blue-600 font-bold px-4 py-2 rounded-full border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-all">
                        <Phone className="h-4 w-4 fill-current" />
                        <span data-editable={isEditable} data-field="navbar-phoneNumber" suppressContentEditableWarning={true} onBlur={handleBlur('navbar', 'phoneNumber')}>
                            {data.navbar.phoneNumber}
                        </span>
                    </button>
                    <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md active:scale-95">
                        <span data-editable={isEditable} data-field="navbar-ctaText" suppressContentEditableWarning={true} onBlur={handleBlur('navbar', 'ctaText')}>
                            {data.navbar.ctaText}
                        </span>
                    </button>
                </div>
            </nav>

            <main className="relative z-10 flex h-[calc(100vh-73px)] items-center px-8 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-8">

                    {/* Left Column: Content */}
                    <div className="md:col-span-7 flex flex-col justify-center py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6"
                                data-editable={isEditable} data-field="hero-title" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'title')}>
                                {data.hero.title}
                            </h1>

                            <p className="max-w-xl text-lg text-slate-500 mb-8 leading-relaxed"
                                data-editable={isEditable} data-field="hero-description" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'description')}>
                                {data.hero.description}
                            </p>

                            <div className="space-y-3 mb-10">
                                {data.hero.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                            <Check className="h-3 w-3 stroke-[3px]" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700"
                                            data-editable={isEditable} data-field={`hero-features-${i}`} suppressContentEditableWarning={true} onBlur={handleBlur('hero', `features-${i}`)}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <button className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
                                    <span data-editable={isEditable} data-field="hero-ctaPrimaryText" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'ctaPrimaryText')}>
                                        {data.hero.ctaPrimaryText}
                                    </span>
                                </button>
                                <button className="flex items-center gap-3 px-6 py-4 rounded-full border-2 border-slate-100 hover:bg-slate-50 transition-all font-bold group">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white group-hover:bg-blue-700 transition-all">
                                        <Phone className="h-5 w-5 fill-current" />
                                    </div>
                                    <span data-editable={isEditable} data-field="hero-phoneNumber" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'phoneNumber')}>
                                        {data.hero.phoneNumber}
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="md:col-span-5 relative flex items-center justify-center py-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full h-full max-h-[70vh] flex items-center justify-center"
                        >
                            {/* Product Image */}
                            <div className="relative z-10" onClick={handleImageClick('visual', 'mainImage')}>
                                <img
                                    src={data.visual.mainImage}
                                    alt="Service Expert"
                                    className="h-auto max-h-[65vh] w-auto drop-shadow-2xl object-contain pointer-events-auto cursor-pointer"
                                    data-editable={isEditable}
                                    data-field="visual-mainImage"
                                    data-type="image"
                                />
                            </div>

                            {/* Floating Testimonials */}
                            {data.testimonials.map((testi, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i === 0 ? 50 : -50, y: i === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                                    className={`absolute z-20 w-64 p-4 bg-white rounded-xl shadow-2xl border border-slate-50 ${i === 0 ? '-top-10 -right-4 md:-right-12' : 'bottom-10 -left-4 md:-left-12'
                                        }`}
                                >
                                    <p className="text-xs text-slate-500 mb-4 italic leading-relaxed"
                                        data-editable={isEditable} data-field={`testimonials-${i}-content`} suppressContentEditableWarning={true} onBlur={handleBlur('testimonials', `content-${i}`)}>
                                        "{testi.content}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <img src={testi.avatar} alt={testi.name} className="h-8 w-8 rounded-full object-cover" />
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-900"
                                                data-editable={isEditable} data-field={`testimonials-${i}-name`} suppressContentEditableWarning={true} onBlur={handleBlur('testimonials', `name-${i}`)}>
                                                {testi.name}
                                            </h4>
                                            <div className="flex gap-0.5 mt-0.5">
                                                {[...Array(5)].map((_, j) => (
                                                    <Star key={j} className={`h-2.5 w-2.5 ${j < testi.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Decorative Shapes */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
