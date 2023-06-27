import { createBrowserRouter } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage';
import { MainPage } from 'pages/MainPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
		],
	},
]);
