import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import { Footer } from '../footer';
import { Box } from '@mui/material';
import type { LoaderFunctionArgs } from 'react-router-dom';
import api from '../../utils/api';
import { useCallback, useEffect, useState } from 'react';
import { ActionType, ActionsContext } from '../../contexts/actions-context';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchUser } from '../../storage/reducers/user/user-slice';
import { useAppDispath, useAppSelector } from '../../storage/hook';
import {
	fetchPosts,
	fetchSearchPosts,
} from '../../storage/reducers/post/posts-slice';
import { selectUser } from '../../storage/reducers/user/selectors';
import { PostsContext } from '../../contexts/posts-context';

export interface LayoutLoaderData {
	posts: Post[];
	user: User;
	comments: Comment[];
}

const Layout = () => {
	const dispatch = useAppDispath();
	const user = useAppSelector(selectUser);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [quickActions, setQuickActions] = useState<ActionType[]>([]);
	const debounceSearchQuery = useDebounce(searchQuery, 300);

	const handleRequest = useCallback(
		function handleRequest() {
			dispatch(fetchSearchPosts(debounceSearchQuery));
		},
		[dispatch, debounceSearchQuery]
	);

	useEffect(() => {
		dispatch(fetchUser()).then(() => {
			dispatch(fetchPosts());
		});
	}, [dispatch]);

	useEffect(() => {
		user && handleRequest();
	}, [debounceSearchQuery, handleRequest]);

	return (
		<ActionsContext.Provider value={{ quickActions, setQuickActions }}>
			<PostsContext.Provider
				value={{
					setSearchQuery,
				}}>
				<Header />
				<main className='container'></main>

				<Box
					component='main'
					sx={{
						pt: '30px',
						pb: '30px',
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'center',
					}}>
					<Outlet />
				</Box>

				<Footer />
			</PostsContext.Provider>
		</ActionsContext.Provider>
	);
};

export const rootLoader = async ({ request, params }: LoaderFunctionArgs) => {
	console.log(request, params);
	const [posts, user, comments] = await api.getAllInfo();
	const data = { posts, user, comments };
	return data;
};

export { Layout };
