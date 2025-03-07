import imageCompression from 'browser-image-compression';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
	if (!link) return '';

	return link
		.replace(/\s/g, '')
		.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, '')
		.toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
	const comprossPromisse = files.map(async (file) => {
		try {
			return await compressImage(file);
		} catch (error) {
			console.log(error);
			return null;
		}
	});

	return (await Promise.all(comprossPromisse)).filter((file) => file !== null);
}

export const compressImage = (file: File): Promise<File> => {
	return new Promise((resolve, reject) => {
		const options = {
			maxSizeMB: 0.2, //200kb
			maxWidthOrHeight: 900,
			useWebWorker: true,
			FileType: 'image/png',
		};
		imageCompression(file, options).then((compressedFile) => {
			resolve(compressedFile);
		});
	});
};
