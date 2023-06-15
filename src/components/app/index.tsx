import './styles.css';
import s from './app.module.css';
import reactImage from './images/react.png';
import LogoUrl, { ReactComponent as LogoIcon } from './images/logo.svg';
import { useState } from 'react';
import { Button } from '../button';

export const App = () => {
	// const num = 0
	const [count, setCount] = useState(0);
	const margin = 40;
	const headerStyle = {
		color: 'red',
		marginLeft: `${margin}px`,
		marginBottom: `${margin}px`,
	};
	return (
		<>
			<h1 style={headerStyle}>Стилизованный заголовок</h1>
			<Button type='primary'>Купить</Button>
			<Button type='secondary'>Подробнее</Button>

			<LogoIcon className={s.root__icon} />
			<img className={s.root__icon} src={LogoUrl} alt='Логотип' />
			<img className={s.root__image} src={reactImage} alt='test' />
			<h1 className={s.root}>React Typescript Webpack</h1>
			<button className='test' onClick={() => setCount((c) => c + 1)}>
				Count- {count}
			</button>
		</>
	);
};
