'use client';

import { useEffect, useState } from 'react';
import type { Testimonial } from '@/lib/firebaseAdmin';
import { getTestimonials } from '@/lib/firebaseAdmin';

let cache: Promise<Testimonial[]> | null = null;

/**
 * Real testimonials registered in the admin panel. Empty until they load,
 * and stays empty when none are registered — the section and its links stay hidden.
 */
export function useTestimonials(): Testimonial[] {
    const [items, setItems] = useState<Testimonial[]>([]);

    useEffect(() => {
        let active = true;
        cache ??= getTestimonials().catch((error) => {
            console.error('Error loading testimonials from Firestore:', error);
            return [];
        });
        cache.then((data) => {
            if (active) setItems(data);
        });
        return () => {
            active = false;
        };
    }, []);

    return items;
}
