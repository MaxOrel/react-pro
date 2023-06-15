import './styles.css';
import s from './app.module.css';
import reactImage from './images/react.png';
import { ReactComponent as LogoIcon } from './images/logo.svg';
import { useState } from 'react';

export const App = () => {
	// const num = 0
	const [count, setCount] = useState(0);
	return (
		<>
			<LogoIcon className={s.root__icon} />
			<img className={s.root__image} src={reactImage} alt='test' />
			<h1 className={s.root}>React Typescript Webpack</h1>
			<button className='test' onClick={() => setCount((c) => c + 1)}>
				Count- {count}
			</button>
		</>
	);
};
