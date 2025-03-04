import Button from '../ui/button';

const Header = () => {
	return (
		<div className="absoulute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10">
			<div className="flex items-center gap-4">
				<img src="/logo.svg" alt="ProjectInBio Logo" />
				<h3 className="text-white text-2xl font-bold">ProjectInBio</h3>
			</div>
			<div className="flex items-center gap-3">
				<Button>Minha Página</Button>
				<Button>Sair</Button>
			</div>
		</div>
	);
};

export default Header;
