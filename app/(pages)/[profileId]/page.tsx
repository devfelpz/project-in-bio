import ProjectCard from '@/app/components/commons/project-card';
import TotalVisits from '@/app/components/commons/total-visits';
import UserCard from '@/app/components/commons/user-card';
import { Plus } from 'lucide-react';

const ProfilePage = async ({ params }: { params: { profileId: string } }) => {
	const { profileId } = await params;

	return (
		<div className="relative h-screen flex p-20 overflow-hidden">
			<div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-tertiary">
				<span>Você está usando a versão trial.</span>
				<button type="button" className="text-accent-green font-bold">
					Faça o upgrade agora
				</button>
			</div>
			<div className="w-1/2 flex justify-center h-min">
				<UserCard />
			</div>
			<div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<button
					type="button"
					className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
					<Plus className="size-10 text-accent-green" />
					<span>Novo Projeto</span>
				</button>
			</div>
			<div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
				<TotalVisits />
			</div>
		</div>
	);
};

export default ProfilePage;
