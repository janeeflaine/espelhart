import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import app from './firebase';

/** Admin-only: kept out of firebaseAdmin.ts so the public site never bundles Firebase Storage. */
const storage = getStorage(app);

// ==================== FILE UPLOAD ====================

export async function uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
}

export async function deleteImage(url: string): Promise<void> {
    try {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

export async function uploadGalleryImages(files: File[], serviceId: string): Promise<string[]> {
    const urls = await Promise.all(
        files.map((file, index) =>
            uploadImage(file, `services/${serviceId}/gallery/${Date.now()}_${index}_${file.name}`)
        )
    );
    return urls;
}
