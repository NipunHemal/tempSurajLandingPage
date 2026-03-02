'use client';

import React, { useState, useEffect } from 'react';
import {
    Menu, X, Leaf, Truck, Phone, Mail, MapPin, ChevronRight, Star,
    CheckCircle2, Sprout, Users, BarChart3, Globe
} from 'lucide-react';
import { NaturalTemplateSchemaType } from './schema';

interface NaturalViewProps {
    data: NaturalTemplateSchemaType;
    isEditable?: boolean;
    onUpdate?: (section: string, field: string, value: any) => void;
}

export default function NaturalView({ data, isEditable, onUpdate }: NaturalViewProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">

            {/* --- Abstract Background Blobs --- */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-emerald-50/50 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header --- */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-stone-100 py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-600 p-1.5 rounded-md">
                            <Sprout className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-700">
                            <span data-editable={isEditable} data-field="navbar-logoText" suppressContentEditableWarning={true} onBlur={handleBlur('navbar', 'logoText')}>
                                {data.navbar.logoText}
                            </span>
                            <span className="text-stone-400 font-normal text-xs ml-1" data-editable={isEditable} data-field="navbar-logoSubText" suppressContentEditableWarning={true} onBlur={handleBlur('navbar', 'logoSubText')}>
                                {data.navbar.logoSubText}
                            </span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {data.navbar.links.map((item, i) => (
                            <a key={i} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                                onBlur={handleBlur('navbar', `links-${i}`)}>
                                {item}
                            </a>
                        ))}
                        <button className="bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-800 transition">
                            <span data-editable={isEditable} data-field="navbar-ctaText" suppressContentEditableWarning={true} onBlur={handleBlur('navbar', 'ctaText')}>
                                {data.navbar.ctaText}
                            </span>
                        </button>
                    </div>

                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-24">
                <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 max-w-md"
                            data-editable={isEditable} data-field="hero-title" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'title')}>
                            {data.hero.title}
                        </h1>
                        <p className="text-slate-500 max-w-md leading-relaxed"
                            data-editable={isEditable} data-field="hero-description" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'description')}>
                            {data.hero.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-emerald-800 transition shadow-lg shadow-emerald-100">
                                <span data-editable={isEditable} data-field="hero-ctaPrimaryText" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'ctaPrimaryText')}>
                                    {data.hero.ctaPrimaryText}
                                </span>
                            </button>
                            <button className="bg-stone-100 text-slate-700 px-6 py-3 rounded-full font-bold text-sm hover:bg-stone-200 transition">
                                <span data-editable={isEditable} data-field="hero-ctaSecondaryText" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'ctaSecondaryText')}>
                                    {data.hero.ctaSecondaryText}
                                </span>
                            </button>
                        </div>

                        {/* Quick Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {data.hero.stats.map((stat, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm relative group">
                                    <div className="text-emerald-600 mb-2">
                                        {i === 0 ? <MapPin size={18} /> : i === 1 ? <CheckCircle2 size={18} /> : <Users size={18} />}
                                    </div>
                                    <div className="text-xl font-bold text-slate-900 empty:hidden"
                                        data-editable={isEditable} data-field={`hero-stats-${i}-value`} suppressContentEditableWarning={true} onBlur={handleBlur('hero', `stats-${i}-value`)}>
                                        {stat.value}
                                    </div>
                                    <div className="text-[11px] font-bold text-stone-400 uppercase leading-none mt-1"
                                        data-editable={isEditable} data-field={`hero-stats-${i}-label`} suppressContentEditableWarning={true} onBlur={handleBlur('hero', `stats-${i}-label`)}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative cursor-pointer" onClick={handleImageClick('hero', 'image')}>
                            <img
                                src={data.hero.image}
                                alt="Main visuals"
                                className="w-full aspect-[4/3] object-cover hover:scale-105 transition duration-700"
                                data-editable={isEditable}
                                data-field="hero-image"
                                data-type="image"
                            />
                            {/* Image Badge overlay */}
                            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-3 px-5 rounded-2xl shadow-xl border border-white/20">
                                <p className="text-xs font-bold text-slate-800"
                                    data-editable={isEditable} data-field="hero-imageBadgeTitle" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'imageBadgeTitle')}>
                                    {data.hero.imageBadgeTitle}
                                </p>
                                <p className="text-[10px] text-stone-500 uppercase font-semibold"
                                    data-editable={isEditable} data-field="hero-imageBadgeDesc" suppressContentEditableWarning={true} onBlur={handleBlur('hero', 'imageBadgeDesc')}>
                                    {data.hero.imageBadgeDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Why choose us Section --- */}
            <section id="whyus" className="py-20 bg-stone-50/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-2xl font-bold mb-10 text-slate-800"
                        data-editable={isEditable} data-field="whyUs-sectionTitle" suppressContentEditableWarning={true} onBlur={handleBlur('whyUs', 'sectionTitle')}>
                        {data.whyUs.sectionTitle}
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {data.whyUs.features.map((card, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition">
                                <div className="bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                                    <Leaf size={20} />
                                </div>
                                <h3 className="text-sm font-bold mb-2 text-slate-900"
                                    data-editable={isEditable} data-field={`whyUs-features-${i}-title`} suppressContentEditableWarning={true} onBlur={handleBlur('whyUs', `features-${i}-title`)}>
                                    {card.title}
                                </h3>
                                <p className="text-xs text-stone-400 leading-relaxed"
                                    data-editable={isEditable} data-field={`whyUs-features-${i}-desc`} suppressContentEditableWarning={true} onBlur={handleBlur('whyUs', `features-${i}-desc`)}>
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Our Flowers Section --- */}
            <section id="flowers" className="py-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-bold text-slate-800"
                            data-editable={isEditable} data-field="flowers-sectionTitle" suppressContentEditableWarning={true} onBlur={handleBlur('flowers', 'sectionTitle')}>
                            {data.flowers.sectionTitle}
                        </h2>
                        <a href="#" className="text-xs font-bold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full flex items-center gap-1 hover:bg-emerald-100 transition">
                            <span data-editable={isEditable} data-field="flowers-ctaText" suppressContentEditableWarning={true} onBlur={handleBlur('flowers', 'ctaText')}>
                                {data.flowers.ctaText}
                            </span> <ChevronRight size={14} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {data.flowers.items.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                                    <div className="p-4 py-3 border-b border-stone-50">
                                        <p className="text-sm font-bold text-slate-700"
                                            data-editable={isEditable} data-field={`flowers-items-${i}-name`} suppressContentEditableWarning={true} onBlur={handleBlur('flowers', `items-${i}-name`)}>
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="aspect-[4/3] overflow-hidden" onClick={handleImageClick('flowers', `items-${i}-img`)}>
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            data-editable={isEditable} data-field={`flowers-items-${i}-img`} data-type="image" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Partners Section --- */}
            <section id="reviews" className="py-20 bg-stone-50/30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-2xl font-bold mb-10 text-slate-800"
                        data-editable={isEditable} data-field="reviews-sectionTitle" suppressContentEditableWarning={true} onBlur={handleBlur('reviews', 'sectionTitle')}>
                        {data.reviews.sectionTitle}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.reviews.items.map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm relative overflow-hidden">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-emerald-50 p-2.5 rounded-2xl">
                                        {i === 0 ? <BarChart3 className="text-emerald-600" size={20} /> : i === 1 ? <Sprout className="text-emerald-600" size={20} /> : <Globe className="text-emerald-600" size={20} />}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-800"
                                        data-editable={isEditable} data-field={`reviews-items-${i}-type`} suppressContentEditableWarning={true} onBlur={handleBlur('reviews', `items-${i}-type`)}>
                                        {card.type}
                                    </h3>
                                </div>
                                <p className="text-sm italic text-stone-500 leading-relaxed font-light"
                                    data-editable={isEditable} data-field={`reviews-items-${i}-quote`} suppressContentEditableWarning={true} onBlur={handleBlur('reviews', `items-${i}-quote`)}>
                                    "{card.quote}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Footer & Contact Form Section --- */}
            <section id="contact" className="py-20 pb-10 bg-gradient-to-b from-stone-50 to-white overflow-hidden relative">
                <div className="absolute top-10 left-0 w-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#10b981" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,133.3C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-slate-800"
                                data-editable={isEditable} data-field="contact-title" suppressContentEditableWarning={true} onBlur={handleBlur('contact', 'title')}>
                                {data.contact.title}
                            </h2>
                            <p className="text-lg text-stone-500"
                                data-editable={isEditable} data-field="contact-description" suppressContentEditableWarning={true} onBlur={handleBlur('contact', 'description')}>
                                {data.contact.description}
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-2xl border border-white shadow-emerald-900/5">
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Name</label>
                                    <input type="text" className="w-full bg-stone-50 border-stone-100 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Email / Phone</label>
                                    <input type="text" className="w-full bg-stone-50 border-stone-100 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Message</label>
                                    <textarea rows={4} className="w-full bg-stone-50 border-stone-100 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none transition resize-none"></textarea>
                                </div>
                                <button className="w-full bg-emerald-700 text-white font-bold py-4 rounded-full hover:bg-emerald-800 transition shadow-lg shadow-emerald-100">
                                    <span data-editable={isEditable} data-field="contact-buttonText" suppressContentEditableWarning={true} onBlur={handleBlur('contact', 'buttonText')}>
                                        {data.contact.buttonText}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Real Footer part */}
                    <div className="mt-32 pt-10 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-600 p-1.5 rounded-md">
                                <Sprout className="text-white w-4 h-4" />
                            </div>
                            <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter">
                                <span data-editable={isEditable} data-field="contact-footerText1" suppressContentEditableWarning={true} onBlur={handleBlur('contact', 'footerText1')}>
                                    {data.contact.footerText1}
                                </span>
                            </p>
                        </div>

                        <p className="text-xs font-medium text-stone-400"
                            data-editable={isEditable} data-field="contact-footerText2" suppressContentEditableWarning={true} onBlur={handleBlur('contact', 'footerText2')}>
                            {data.contact.footerText2}
                        </p>

                        <p className="text-[10px] text-stone-400"
                            data-editable={isEditable} data-field="contact-footerText3" suppressContentEditableWarning={true} onBlur={handleBlur('contact', 'footerText3')}>
                            {data.contact.footerText3}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-[60] flex flex-col p-8 md:hidden animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-2">
                            <Sprout className="text-emerald-600" />
                            <span className="font-bold">DMS Horticulture</span>
                        </div>
                        <button onClick={() => setIsMenuOpen(false)}><X /></button>
                    </div>
                    <div className="flex flex-col gap-6 text-2xl font-bold">
                        {data.navbar.links.map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setIsMenuOpen(false)}>
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="mt-12 bg-emerald-700 text-white py-4 rounded-full font-bold">{data.navbar.ctaText}</button>
                </div>
            )}

        </div>
    );
};
