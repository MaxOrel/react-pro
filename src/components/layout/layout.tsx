import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { Header } from '../header';
import { Footer } from '../footer';
import { Box } from '@mui/material';
import type { LoaderFunctionArgs } from 'react-router-dom';
import api from '../../utils/api';
import { useCallback, useEffect, useState } from 'react';
import { ActionType, ActionsContext } from '../../contexts/actions-context';
import { useDebounce } from '../../hooks/useDebounce';
import { PostsContext } from '../../contexts/posts-context';
import { UserContext } from '../../contexts/user-context';
import { isLiked } from '../../utils/posts';
import { Spinner } from '../spinner';

export interface LayoutLoaderData {
	posts: Post[];
	user: User;
	comments: Comment[];
}

const Layout = () => {
	const { posts: postsData, user } = useLoaderData() as LayoutLoaderData;
	const [posts, setPosts] = useState<Post[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [quickActions, setQuickActions] = useState<ActionType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigation = useNavigation();
	const debounceSearchQuery = useDebounce(searchQuery, 300);

	const handleRequest = useCallback(
		function handleRequest() {
			api.search(debounceSearchQuery).then((dataSearch) => {
				setPosts(dataSearch);
			});
		},
		[debounceSearchQuery]
	);

	useEffect(() => {
		currentUser && handleRequest();
	}, [debounceSearchQuery, handleRequest]);

	function handlePostDelete(idPost: string) {
		api
			.deletePostById(idPost)
			.then((deletedPost) => {
				const newPosts = posts.filter((postState) => {
					return postState._id !== deletedPost._id;
				});

				setPosts(newPosts);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handlePostLike(post: PostLikeParam): Promise<Post> {
		const like = isLiked(post.likes, (currentUser as User)._id);

		return api
			.changeLikePostStatus(post._id, like)
			.then((updatePost) => {
				const newPosts = posts.map((postState) => {
					return postState._id === updatePost._id ? updatePost : postState;
				});

				setPosts(newPosts);
				return updatePost;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		setCurrentUser(user);
		setPosts(postsData);
		setIsLoading(false);
	}, [postsData, user]);
	console.log(navigation.state);

	return (
		<ActionsContext.Provider value={{ quickActions, setQuickActions }}>
			<PostsContext.Provider
				value={{
					posts,
					onPostDelete: handlePostDelete,
					onPostLike: handlePostLike,
					setSearchQuery,
				}}>
				<UserContext.Provider value={currentUser}>
					<Header />
					<main className='container'></main>

					<Box component='main' sx={{ pt: '30px', pb: '30px', flexGrow: 1 }}>
						{navigation.state === 'loading' || isLoading ? (
							<Spinner />
						) : (
							<Outlet />
						)}
					</Box>

					<Footer />
				</UserContext.Provider>
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
