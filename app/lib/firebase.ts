import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import 'server-only';

const decodedKey = Buffer.from(
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.FIREBASE_PRIVATE_KEY!,
	'base64',
).toString('utf8');

// Certificado
export const firebaseCert = cert({
	projectId: process.env.FIREBASE_PROJECT_ID,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: decodedKey,
});

//Instacia do app
if (!getApps().length) {
	initializeApp({
		credential: firebaseCert,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	});
}

export const db = getFirestore();

export const storage = getStorage().bucket();
