'use client';

import { uploadImage } from '@/lib/firebaseAdmin';

/**
 * Resizes and re-encodes an image in the browser before upload so phone photos
 * (often 5–12 MB) fit the 5 MB Storage limit and load fast on the site.
 */
export async function compressImage(file: File, maxSide = 2000, quality = 0.85): Promise<File> {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') return file;
    try {
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return file;
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
        if (!blob || blob.size >= file.size) return file;
        const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
        return new File([blob], name, { type: 'image/webp' });
    } catch {
        return file;
    }
}

/**
 * Uploads a site image. Stored under `services/` because that is the folder the
 * current Storage rules allow authenticated uploads to.
 */
export async function uploadSiteImage(file: File, folder: string): Promise<string> {
    const compressed = await compressImage(file);
    const safeName = compressed.name.replace(/[^\w.-]+/g, '_');
    return uploadImage(compressed, `services/${folder}/${Date.now()}_${safeName}`);
}
