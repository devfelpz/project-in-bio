'use client';
import { createProject } from '@/app/actions/create-project';
import Button from '@/app/components/ui/button';
import Modal from '@/app/components/ui/modal';
import TextInput from '@/app/components/ui/text-input';
import Textarea from '@/app/components/ui/textarea';
import { compressFiles } from '@/app/lib/utils';
import { ArrowUpFromLine, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, startTransition, useState } from 'react';

const NewProject = ({ profileId }: { profileId: string }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenModal = () => setIsOpen(true);
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [projectUrl, setProjectUrl] = useState('');
	const [projectImage, setProjectImage] = useState<string | null>(null);
	const [isCreatingProject, setIsCreatingProject] = useState(false);

	function triggerImageInput(id: string) {
		const input = document.getElementById(id)?.click();
	}
	function handleImageInput(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			const imageURL = URL.createObjectURL(file);
			return imageURL;
		}
		return null;
	}

	async function handleSaveProject() {
		setIsCreatingProject(true);
		const imagesInput = document.getElementById(
			'imageInput',
		) as HTMLInputElement;

		if (!imagesInput.files) return;

		const compressedFile = await compressFiles(Array.from(imagesInput.files));

		const formData = new FormData();

		formData.append('file', compressedFile[0]);
		formData.append('profileId', profileId);
		formData.append('projectName', projectName);
		formData.append('projectDescription', projectDescription);
		formData.append('projectUrl', projectUrl);

		await createProject(formData);

		startTransition(() => {
			setIsOpen(false);
			setIsCreatingProject(false);
			setProjectName('');
			setProjectDescription('');
			setProjectUrl('');
			setProjectImage(null);

			router.refresh();
		});
	}

	return (
		<>
			<button
				type="button"
				className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border hover:border-dashed border-border-secondary"
				onClick={handleOpenModal}>
				<Plus className="size-10 text-accent-green" />
				<span>Novo projeto</span>
			</button>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<div className="bg-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
					<p className="text-white font-bold text-xl">Novo projeto</p>
					<div className="flex gap-10">
						<div className="flex flex-col items-center gap-3 text-xs">
							<div className="w-[100px] h-[100px] rounded-xl bg-tertiary overflow-hidden">
								{projectImage ? (
									<img
										src={projectImage}
										alt="ProjectImage"
										className="object-cover object-center"
									/>
								) : (
									<button
										className="w-full h-full"
										type="button"
										onClick={() => triggerImageInput('imageInput')}>
										100X100
									</button>
								)}
							</div>
							<button
								className="text-white flex items-center gap-2"
								type="button"
								onClick={() => triggerImageInput('imageInput')}>
								<ArrowUpFromLine className="size-4" />
								<span>Adicionar imagen</span>
							</button>
							<input
								type="file"
								id="imageInput"
								accept="image/*"
								className="hidden"
								onChange={(e) => setProjectImage(handleImageInput(e))}
							/>
						</div>
						<div className="flex flex-col gap-4 w-[293px]">
							<div className="flex flex-col gap-1">
								<label htmlFor="project-name" className="text-white font-bold">
									Titulo do porjeto
								</label>
								<TextInput
									id="project-name"
									placeholder="Digite o nome do projeto"
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									htmlFor="project-description"
									className="text-white font-bold">
									Descrição
								</label>
								<Textarea
									id="project-description"
									placeholder="De uma breve descrição do seu projeto"
									className="h-36"
									value={projectDescription}
									onChange={(e) => setProjectDescription(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="project-url" className="text-white font-bold">
									URL do projeto
								</label>
								<TextInput
									type="url"
									id="project-url"
									placeholder="Digite a URL do projeto"
									value={projectUrl}
									onChange={(e) => setProjectUrl(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-4 justify-end">
						<button
							type="button"
							className="font-bold text-white"
							onClick={() => setIsOpen(!isOpen)}>
							Voltar
						</button>
						<Button onClick={handleSaveProject} disabled={isCreatingProject}>
							Salvar
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};
export default NewProject;
