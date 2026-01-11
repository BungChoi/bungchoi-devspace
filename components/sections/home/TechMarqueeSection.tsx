'use client';

/**
 * ===========================================
 * TECH MARQUEE COMPONENT
 * ===========================================
 * Infinite scrolling tech stack display with wordmark logos.
 * Uses JavaScript requestAnimationFrame for truly seamless looping.
 */

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

// ============================================
// TYPES
// ============================================

interface TechMarqueeSectionProps {
    className?: string;
    speed?: number; // pixels per second
}

interface TechItem {
    name: string;
    hasIcon?: boolean;
}

// ============================================
// TECH DATA
// ============================================

const techStack: TechItem[] = [
    { name: 'Flutter', hasIcon: true },
    { name: 'Dart', hasIcon: true },
    { name: 'Figma', hasIcon: true },
    { name: 'Git', hasIcon: true },
    { name: 'GitHub', hasIcon: true },
    { name: 'Firebase', hasIcon: true },
    { name: 'GetX', hasIcon: true },
    { name: 'Bloc', hasIcon: true },
];

// ============================================
// SVG ICONS
// ============================================

const TechIcon = ({ name }: { name: string }) => {
    switch (name) {
        case 'Flutter':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
                </svg>
            );
        case 'Dart':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679L1.105 13.105c0 .265.16.519.265.625l8.59 8.59h5.262l-8.42-8.421v-.842L11.632 7.4l4.263-2.526L4.784 4.784z" />
                </svg>
            );
        case 'Figma':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
                </svg>
            );
        case 'Git':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
                </svg>
            );
        case 'GitHub':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            );
        case 'Firebase':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" />
                </svg>
            );
        case 'GetX':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    {/* Three interconnected circles - GetX logo */}
                    <circle cx="12" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="6" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="18" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            );
        case 'Bloc':
            return (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L5 8.09v7.82l7 3.94l7-3.94V8.09l-7-3.94z" />
                </svg>
            );
        default:
            return null;
    }
};

// ============================================
// TECH ITEM COMPONENT
// ============================================

function TechItemDisplay({ tech }: { tech: TechItem }) {
    return (
        <div className="flex items-center gap-2 px-8 whitespace-nowrap text-white/40 hover:text-white/70 transition-colors shrink-0">
            {tech.hasIcon && <TechIcon name={tech.name} />}
            <span
                className="text-lg font-semibold tracking-wide"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
                {tech.name}
            </span>
        </div>
    );
}

// ============================================
// COMPONENT
// ============================================

export function TechMarqueeSection({ className, speed = 50 }: TechMarqueeSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const positionRef = useRef(0);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const singleSetWidthRef = useRef<number>(0);

    // Create enough duplicates to fill the screen
    const allItems = [...techStack, ...techStack, ...techStack, ...techStack];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Measure the width of one set of items (first 8 items)
        const measureSetWidth = () => {
            const items = track.children;
            let width = 0;
            for (let i = 0; i < techStack.length && i < items.length; i++) {
                width += (items[i] as HTMLElement).offsetWidth;
            }
            singleSetWidthRef.current = width;
        };

        measureSetWidth();

        const animate = (currentTime: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = currentTime;
            }

            const deltaTime = currentTime - lastTimeRef.current;
            lastTimeRef.current = currentTime;

            if (!isPaused && singleSetWidthRef.current > 0) {
                // Move position based on speed and time
                positionRef.current += (speed * deltaTime) / 1000;

                // Reset when we've moved one full set width (seamless loop)
                if (positionRef.current >= singleSetWidthRef.current) {
                    positionRef.current = positionRef.current % singleSetWidthRef.current;
                }

                // Apply transform
                track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Handle resize
        const handleResize = () => {
            measureSetWidth();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [isPaused, speed]);

    return (
        <div
            ref={containerRef}
            className={cn('marquee-container w-full overflow-hidden py-6 relative z-10', className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

            {/* Animated track with GPU acceleration */}
            <div
                ref={trackRef}
                className="flex will-change-transform"
                style={{ backfaceVisibility: 'hidden' }}
            >
                {allItems.map((tech, index) => (
                    <TechItemDisplay key={`item-${index}`} tech={tech} />
                ))}
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { TechMarqueeSectionProps };
