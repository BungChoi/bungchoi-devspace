'use client';

/**
 * ===========================================
 * useInViewOnce
 * ===========================================
 * IntersectionObserver helper — sets true once when element enters view.
 * Respects prefers-reduced-motion (immediately true).
 */

import { useEffect, useState, type RefObject } from 'react';

interface UseInViewOnceOptions {
    rootMargin?: string;
    threshold?: number;
}

export function useInViewOnce(
    ref: RefObject<Element | null>,
    options: UseInViewOnceOptions = {}
): boolean {
    const { rootMargin = '0px 0px -12% 0px', threshold = 0.15 } = options;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || isVisible) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const timeout = window.setTimeout(() => setIsVisible(true), 0);
            return () => window.clearTimeout(timeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, rootMargin, threshold, isVisible]);

    return isVisible;
}
