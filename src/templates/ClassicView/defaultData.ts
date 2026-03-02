import { ClassicViewSchemaType } from "./schema";

export const defaultClassicData: ClassicViewSchemaType = {
    navbar: {
        logoText: "PlumbMaster",
        links: [
            { label: "Home", href: "#" },
            { label: "About", href: "#" },
            { label: "Services", href: "#" },
            { label: "Contact", href: "#" }
        ],
        ctaText: "Get a quote",
        phoneNumber: "+48 234 123 432"
    },
    hero: {
        title: "Trusted Plumber Experts in Your Area",
        description: "Providing quality, efficient, and affordable solutions for both residential and commercial needs.",
        features: [
            "Affordable prices",
            "90% of jobs are done on the same day",
            "Over 540+ clients in Shepparton area"
        ],
        ctaPrimaryText: "Get a quote",
        ctaSecondaryText: "Call Us",
        phoneNumber: "+48 234 123 432"
    },
    visual: {
        mainImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000"
    },
    testimonials: [
        {
            name: "John",
            content: "The plumber was friendly, professional, and explained everything clearly. Their rates were fair, and they left my home spotless.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100"
        }
    ]
};
