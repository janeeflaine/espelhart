import { NextResponse, NextRequest } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Temporary route to create the first admin user
// DELETE THIS FILE after creating your admin user!
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        return NextResponse.json({
            success: true,
            message: `Admin user created successfully!`,
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            warning: 'DELETE the file src/app/api/create-admin/route.ts after use!'
        });
    } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };
        return NextResponse.json(
            {
                error: firebaseError.code || 'unknown',
                message: firebaseError.message || 'Failed to create user',
            },
            { status: 400 }
        );
    }
}
