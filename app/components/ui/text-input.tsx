import { cn } from '@/app/lib/utils';

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			{...props}
			className={cn(
				'w-full p-3 bg-secondary text-white placeholder:text-placeholder rounded-xl border border-transparent hover:border-border-secondary hover:text-body active:border-border-tertiary',
				props.className,
			)}
		/>
	);
};

export default TextInput;
