import { ReactNode } from 'react';
import cn from 'classnames';
import s from './button.module.css';

interface IButtonProps {
	type: string;
	children: ReactNode;
}

export const Button: React.FC<IButtonProps> = ({ type, children }) => {
	return (
		<button
			className={cn(s.button, {
				[s.primary]: type === 'primary',
				[s.secondary]: type === 'secondary',
			})}>
			{children}
		</button>
	);
};
