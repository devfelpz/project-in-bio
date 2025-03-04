import { TrendingUp } from 'lucide-react';

const TotalVisits = () => {
	return (
		<div className="w-min whitespace-nowrap flex items-center gap-5 bg-secondary border-border-primary px-8 py-3 rounded-xl shadow-lg">
			<span className="font-bold text-white">Total de visitas</span>
			<div className="flex items-center gap-2 text-accent-green">
				<span className="text-3xl font-bold">12342</span>
				<TrendingUp />
			</div>
			{/* <div className="flex item-center gap-2">
				<button type="button">Portal</button>
				<button type="button">Sair</button>
			</div> */}
		</div>
	);
};

export default TotalVisits;
