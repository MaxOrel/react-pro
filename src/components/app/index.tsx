import { useEffect, useState } from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import { HomePage } from '../../pages/home';
import { postData } from '../../posts.js';
import { Box } from '@mui/material';

export const App = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	function handlePostDelete(idPost: string) {
		const newPosts = posts.filter((postState) => {
			return postState._id !== idPost;
		});
		setPosts(newPosts);
	}
	useEffect(() => {
		setPosts(postData);
	}, []);

	return (
		<>
			<Header />

			<Box component='main' sx={{ pt: '30px', pb: '30px' }}>
				<HomePage posts={posts} onPostDelete={handlePostDelete} />
			</Box>

			<Footer />
		</>
	);
};
