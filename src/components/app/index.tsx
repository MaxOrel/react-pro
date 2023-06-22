import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { SinglePostPage, singlePostLoader } from '../../pages/single-post';
import { ProfilePage } from '../../pages/profile';
import { NotFoundPage } from '../../pages/not-found';
import { Layout, rootLoader } from '../layout/layout';
import CounterPage from '../../pages/counter';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' id='root' loader={rootLoader} element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route
				id='post'
				path='/post/:postId'
				loader={singlePostLoader}
				element={<SinglePostPage />}
				errorElement={<NotFoundPage />}
			/>
			<Route path='/profile' element={<ProfilePage />} />
			<Route path='/counter' element={<CounterPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Route>
	)
);

export const App = () => {
	return <RouterProvider router={router} />;
};
