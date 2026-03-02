import { NaturalTemplateSchemaType } from "./schema";

export const defaultNaturalData: NaturalTemplateSchemaType = {
    navbar: {
        logoText: "DMS Horticulture",
        logoSubText: "(PVT) LTD",
        links: ['Why Us', 'Flowers', 'Reviews', 'Contact'],
        ctaText: "Get a Quote"
    },
    hero: {
        title: "Premium Flowers from Sri Lanka's trusted farm network",
        description: "DMS Horticulture (PVT) LTD supplies fresh-cut flowers and plants with consistent quality, careful handling, and reliable delivery.",
        ctaPrimaryText: "Explore Flowers",
        ctaSecondaryText: "Contact Sales",
        stats: [
            { label: 'Farm locations', value: '4' },
            { label: 'Consistent supply', value: '' },
            { label: 'B2B Bulk supply', value: '' }
        ],
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000",
        imageBadgeTitle: "Quality Check",
        imageBadgeDesc: "Grading • Picking • Cold chain"
    },
    whyUs: {
        sectionTitle: "Why choose DMS?",
        features: [
            { title: 'Farm-direct freshness', desc: 'Carefully harvested and packed to preserve color, scent, and life.' },
            { title: 'Consistent supply', desc: 'Multiple farm locations to preserve color, scent, and life and delays.' },
            { title: 'Bulk & custom orders', desc: 'Fresh, vibrant floras and delivery locations.' },
            { title: 'Sustainable practices', desc: 'Smart irrigation and responsible handling for florists.' }
        ]
    },
    flowers: {
        sectionTitle: "Our flowers",
        ctaText: "Request price list",
        items: [
            { name: 'Roses', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400' },
            { name: 'Gerbera', img: 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?auto=format&fit=crop&q=80&w=400' },
            { name: 'Chrysanthemum', img: 'https://images.unsplash.com/photo-1597423380816-df82087679ca?auto=format&fit=crop&q=80&w=400' },
            { name: 'Orchids', img: 'https://images.unsplash.com/photo-1534885391148-43304a2739ea?auto=format&fit=crop&q=80&w=400' },
            { name: 'Foliage & Greens', img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    reviews: {
        sectionTitle: "What partners say",
        items: [
            { type: 'Hotel Procurement', quote: 'Consistent quality and easy bulk ordering. Packaging is very neat.' },
            { type: 'Florist Partner', quote: 'Fresh flowers with good vase life. Reliable weekly supply.' },
            { type: 'Event Organizer', quote: 'Delivered on time and the blooms looked amazing on the day.' }
        ]
    },
    contact: {
        title: "Need bulk supply?",
        description: "Get in touch for B2B pricing and availability.",
        buttonText: "Send inquiry",
        footerText1: "DMS Horticulture",
        footerText2: "Flower farm supply • Sri Lanka",
        footerText3: "© 2024 DMS Horticulture (PVT) LTD. All rights reserved."
    }
};
