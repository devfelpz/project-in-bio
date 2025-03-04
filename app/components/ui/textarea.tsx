import { cn } from '@/app/lib/utils';

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
	return (
		<textarea
			{...props}
			className={cn(
				'w-full p-3 bg-secondary text-white placeholder:text-placeholder rounded-xl border border-transparent hover:border-border-secondary hover:text-body active:border-border-tertiary',
				props.className,
			)}
		/>
	);
};

export default Textarea;
