import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../header';
import { Footer } from '../footer';
import { HomePage } from '../../pages/home';
import { Box } from '@mui/material';
import api from '../../utils/api';
import { isLiked } from '../../utils/posts';
import { useDebounce } from '../../hooks/useDebounce';
import { Spinner } from '../spinner';
import { SinglePostPage } from '../../pages/single-post';
import { ProfilePage } from '../../pages/profile';
import { NotFoundPage } from '../../pages/not-found';

export const App = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const debounceSearchQuery = useDebounce(searchQuery, 300);

	const handleRequest = useCallback(
		function handleRequest() {
			setIsLoading(true);
			api
				.search(debounceSearchQuery)
				.then((dataSearch) => {
					setPosts(dataSearch);
				})
				.finally(() => setIsLoading(false));
		},
		[debounceSearchQuery]
	);

	function handleSearchInputChange(
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		setSearchQuery(event.target.value);
	}

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
		api
			.getAllInfo()
			.then(([postsData, userInfoData]) => {
				setCurrentUser(userInfoData);
				setPosts(postsData);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Header
				onSearchChange={handleSearchInputChange}
				currentUser={currentUser}
			/>

			<Box component='main' sx={{ pt: '30px', pb: '30px', flexGrow: 1 }}>
				{isLoading ? (
					<Spinner />
				) : (
					<Routes>
						<Route
							path='/'
							element={
								<HomePage
									posts={posts}
									onPostLike={handlePostLike}
									currentUser={currentUser}
									onPostDelete={handlePostDelete}
								/>
							}
						/>
						<Route
							path='/post/:postId'
							element={
								<SinglePostPage
									onPostLike={handlePostLike}
									currentUser={currentUser}
									onPostDelete={handlePostDelete}
								/>
							}
						/>
						<Route
							path='/profile'
							element={
								<ProfilePage
									onPostDelete={handlePostDelete}
									currentUser={currentUser}
								/>
							}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				)}
			</Box>

			<Footer />
		</>
	);
};
