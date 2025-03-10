'use client';

import type { ProjectData } from '@/app/server/get-profile-data';
import Link from 'next/link';

const ProjectCard = ({
	project,
	isOwner,
	img,
}: {
	project: ProjectData;
	isOwner: boolean;
	img: string;
}) => {
	const projectUrl = project.projectUrl;

	const formattedUrl = project.projectUrl.startsWith('http')
		? projectUrl
		: `https://${projectUrl}`;

	function handleClick() {
		console.log('clicked'); //TODO: Implementar analytics
	}
	return (
		<Link href={formattedUrl} target="_blank" onClick={handleClick}>
			<div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
				<div className="size-24 rounded-md overflow-hidden flex-shrink-0">
					<img src={img} alt="Projeto" className="w-full h-full object-cover" />
				</div>
				<div className="flex flex-col gap-2">
					{isOwner && (
						<span className="uppercase text-xs font-bold text-accent-green">
							{project.totalVisits || 0} cliques
						</span>
					)}

					<div className="flex flex-col">
						<span className="text-white font-bold">{project.projectName}</span>
						<span className="text-content-body text-sm">
							{project.projectDescription}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
