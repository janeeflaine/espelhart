import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export async function GET() {
    const results: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
        tests: {},
    };

    // ============================================
    // TEST 1: Credential Validation
    // ============================================
    const envVars = {
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const missingVars = Object.entries(envVars)
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missingVars.length > 0) {
        (results.tests as Record<string, unknown>)['1_credential_validation'] = {
            status: 'FAIL',
            error: `Missing environment variables: ${missingVars.join(', ')}`,
        };
        return NextResponse.json({ ...results, overall: 'FAIL' }, { status: 500 });
    }

    (results.tests as Record<string, unknown>)['1_credential_validation'] = {
        status: 'PASS',
        projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        message: 'All 6 environment variables are loaded correctly.',
    };

    // ============================================
    // TEST 2: Firebase App Initialization
    // ============================================
    let db;
    let auth;
    try {
        const firebaseConfig = {
            apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        (results.tests as Record<string, unknown>)['2_firebase_init'] = {
            status: 'PASS',
            message: 'Firebase App initialized. getFirestore() returned valid instance.',
            firestoreType: db.type,
            appName: app.name,
        };
    } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : String(error);
        (results.tests as Record<string, unknown>)['2_firebase_init'] = {
            status: 'FAIL',
            error: errMessage,
        };
        return NextResponse.json({ ...results, overall: 'FAIL' }, { status: 500 });
    }

    // ============================================
    // TEST 3: Firestore Write (site_settings)
    // ============================================
    try {
        const testDocRef = doc(db, 'site_settings', 'connection_test');

        // Write
        await setDoc(testDocRef, {
            status: 'online',
            testedAt: serverTimestamp(),
            source: 'firebase-connection-test',
        });

        // Read back
        const snapshot = await getDoc(testDocRef);

        if (snapshot.exists()) {
            const data = snapshot.data();
            (results.tests as Record<string, unknown>)['3_firestore_write'] = {
                status: 'PASS',
                message: 'Successfully wrote and read document in site_settings collection.',
                documentData: {
                    status: data.status,
                    source: data.source,
                },
            };

            // Cleanup: delete the test document
            await deleteDoc(testDocRef);
        } else {
            (results.tests as Record<string, unknown>)['3_firestore_write'] = {
                status: 'FAIL',
                error: 'Document was written but could not be read back.',
            };
        }
    } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : String(error);
        let diagnosis = 'Unknown error';

        if (errMessage.includes('permission-denied') || errMessage.includes('PERMISSION_DENIED')) {
            diagnosis =
                'PERMISSION ERROR: Firestore Rules are blocking the write. Check firestore.rules — the site_settings collection may not be in the allowed list. Current rules only allow: services, testimonials, faqs, settings.';
        } else if (errMessage.includes('not-found') || errMessage.includes('NOT_FOUND')) {
            diagnosis = 'REGION ERROR: The Firestore database may not be created yet, or is in a different region.';
        } else if (errMessage.includes('invalid-api-key') || errMessage.includes('API_KEY')) {
            diagnosis = 'API KEY ERROR: The Firebase API key is invalid or restricted.';
        } else if (errMessage.includes('unavailable') || errMessage.includes('UNAVAILABLE')) {
            diagnosis = 'NETWORK ERROR: Cannot reach Firestore. Check internet connection or Firebase project status.';
        }

        (results.tests as Record<string, unknown>)['3_firestore_write'] = {
            status: 'FAIL',
            error: errMessage,
            diagnosis,
        };
    }

    // ============================================
    // TEST 4: Firebase Auth Instance Check
    // ============================================
    try {
        if (auth) {
            (results.tests as Record<string, unknown>)['4_auth_instance'] = {
                status: 'PASS',
                message: 'Firebase Auth instance created successfully.',
                authConfig: {
                    apiKey: auth.config.apiKey ? '***configured***' : 'MISSING',
                    authDomain: auth.config.authDomain,
                },
            };
        } else {
            (results.tests as Record<string, unknown>)['4_auth_instance'] = {
                status: 'FAIL',
                error: 'getAuth() did not return a valid instance.',
            };
        }
    } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : String(error);
        (results.tests as Record<string, unknown>)['4_auth_instance'] = {
            status: 'FAIL',
            error: errMessage,
        };
    }

    // ============================================
    // OVERALL RESULT
    // ============================================
    const testResults = results.tests as Record<string, { status: string }>;
    const allPassed = Object.values(testResults).every((t) => t.status === 'PASS');

    results.overall = allPassed ? 'Firebase Connection: SUCCESS' : 'Firebase Connection: PARTIAL (check individual tests)';

    console.log('\n========================================');
    console.log(allPassed ? '✅ Firebase Connection: SUCCESS' : '⚠️ Firebase Connection: PARTIAL');
    console.log('========================================');
    Object.entries(testResults).forEach(([name, result]) => {
        console.log(`  ${result.status === 'PASS' ? '✅' : '❌'} ${name}: ${result.status}`);
    });
    console.log('========================================\n');

    return NextResponse.json(results, { status: allPassed ? 200 : 207 });
}
