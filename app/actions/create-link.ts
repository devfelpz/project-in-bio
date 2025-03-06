'use server';

import { Timestamp } from 'firebase-admin/firestore';
import { auth } from '../lib/auth';
import { db } from '../lib/firebase';

export async function createLink(link: string) {
	const session = await auth();

	try {
		if (!session?.user) return;

		await db.collection('profiles').doc(link).set({
			userId: session.user.id,
			totalVisits: 0,
			createdAt: Timestamp.now(),
		});

		return true;
	} catch {
		return false;
	}
}
