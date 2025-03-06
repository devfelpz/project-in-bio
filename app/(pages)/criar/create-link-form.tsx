'use client';

import { createLink } from '@/app/actions/create-link';
import verifyLink from '@/app/actions/verify-link';
import Button from '@/app/components/ui/button';
import TextInput from '@/app/components/ui/text-input';
import { sanitizeLink } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';

const CreateLinkForm = () => {
	const [link, setLink] = useState('');
	const [error, setError] = useState('');

	const router = useRouter();

	function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
		setError('');
		setLink(sanitizeLink(e.target.value));
	}

	async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		if (link.length === 0) return setError('Escolha um linl primeiro :)');

		const isLinkTaken = await verifyLink(link);

		if (isLinkTaken) return setError('Desculpe, esse link já está em uso.');

		const isLinkCreated = await createLink(link);

		if (!isLinkCreated)
			return setError('Erro ao criar o perfil. Tente novamente.');

		router.push(`/${link}`);
	}
	// Do something with

	return (
		<>
			<form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
				<span className="text-white">projectinbio.com</span>
				<TextInput value={link} onChange={handleLinkChange} />
				<Button className="w-[126px]">Criar</Button>
			</form>
			<div>
				<span className="text-accent-pink">{error}</span>
			</div>
		</>
	);
};

export default CreateLinkForm;
