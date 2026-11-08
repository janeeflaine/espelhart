import { getAuth } from 'firebase/auth';
import app from './firebase';

/** Admin-only: imported lazily so public visitors never download Firebase Auth. */
export const auth = getAuth(app);
