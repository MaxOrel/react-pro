import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './components/app';

// const el = React.createElement('h1', null, 'Hello World, React.js!'); //react элемент без jsx

// const el = <h1>Hello World</h1>; //react элемент c jsx

// const el = (
// 	<>
// 		<h1>Hello World</h1>
// 		<ul>
// 			<li>Мой первый элемент</li>
// 			<li>Мой второй элемент</li>
// 		</ul>
// 	</>
// ); //использование react фрагмента

//выделение и создание компонентов
// const AppHeader = () => {
// 	return <h1>Hello World</h1>;
// };

// const AppList = () => {
// 	return (
// 		<ul>
// 			<li>Мой первый элемент</li>
// 			<li>Мой второй элемент</li>
// 		</ul>
// 	);
// };

//про jsx и рендер списков
// const AppList = () => {
// 	const items = ['Мой первый элемент', 'Мой второй элемент'];
// 	const firstItem = <li>Самый первый элемент</li>;
// 	return (
// 		<ul>
// 			{firstItem}
// 			{items.map((item, index) => (
// 				<li key={index}>{item}</li>
// 			))}
// 			<li>{items[0]}</li>
// 			<li>{items[1]}</li>
// 		</ul>
// 	);
// };

// const el = (
// 	<>
// 		<AppHeader />
// 		<AppList />
// 	</>
// );

// console.log(el);

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(<App />);
