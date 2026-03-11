import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';

// ==================== TYPES ====================

export interface Service {
    id?: string;
    title: string;
    description: string;
    mainImage: string;
    gallery: string[];
    icon?: string;
    featured?: boolean;
    order?: number;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Testimonial {
    id?: string;
    name: string;
    text: string;
    rating: number;
    avatar?: string;
    date?: string;
    createdAt?: Timestamp;
}

export interface FAQ {
    id?: string;
    question: string;
    answer: string;
    order?: number;
    createdAt?: Timestamp;
}

export interface SiteSettings {
    whatsappNumber: string;
    whatsappMessage: string;
    instagram: string;
    facebook: string;
    aboutTitle: string;
    aboutText: string;
    aboutStats: { label: string; value: string }[];
    footerText: string;
    phone: string;
    email: string;
    address: string;
}

// ==================== SERVICES ====================

export async function getServices(): Promise<Service[]> {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Service));
}

export async function getService(id: string): Promise<Service | null> {
    const docRef = doc(db, 'services', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Service : null;
}

export async function addService(service: Omit<Service, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'services'), {
        ...service,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    return docRef.id;
}

export async function updateService(id: string, data: Partial<Service>): Promise<void> {
    await updateDoc(doc(db, 'services', id), {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

export async function deleteService(id: string): Promise<void> {
    await deleteDoc(doc(db, 'services', id));
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials(): Promise<Testimonial[]> {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Testimonial));
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'testimonials'), {
        ...testimonial,
        createdAt: Timestamp.now(),
    });
    return docRef.id;
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
    await updateDoc(doc(db, 'testimonials', id), data);
}

export async function deleteTestimonial(id: string): Promise<void> {
    await deleteDoc(doc(db, 'testimonials', id));
}

// ==================== FAQS ====================

export async function getFAQs(): Promise<FAQ[]> {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FAQ));
}

export async function addFAQ(faq: Omit<FAQ, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'faqs'), {
        ...faq,
        createdAt: Timestamp.now(),
    });
    return docRef.id;
}

export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<void> {
    await updateDoc(doc(db, 'faqs', id), data);
}

export async function deleteFAQ(id: string): Promise<void> {
    await deleteDoc(doc(db, 'faqs', id));
}

// ==================== SETTINGS ====================

export async function getSettings(): Promise<SiteSettings | null> {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as SiteSettings : null;
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<void> {
    await updateDoc(doc(db, 'settings', 'general'), data);
}

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
