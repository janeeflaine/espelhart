import Image, { type ImageProps } from 'next/image';

const OPTIMIZED_HOSTS = ['firebasestorage.googleapis.com', 'images.unsplash.com'];

function isOptimizable(src: string) {
    try {
        return OPTIMIZED_HOSTS.includes(new URL(src).hostname);
    } catch {
        return false;
    }
}

/**
 * next/image for photos from known hosts (resized + WebP/AVIF per device);
 * falls back to a plain <img> for any other URL so a pasted link never breaks the page.
 * Always used with `fill` inside a positioned, sized container.
 */
export default function SiteImage({ src, alt, className, sizes, priority }: Pick<ImageProps, 'alt' | 'className' | 'sizes' | 'priority'> & { src: string }) {
    if (!src) return null;
    if (isOptimizable(src)) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                preload={priority}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : undefined}
                className={className}
            />
        );
    }
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full ${className ?? ''}`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
        />
    );
}
