import { useContext, useEffect, useState } from 'react';
import { useLoaderData, LoaderFunctionArgs } from 'react-router';
import { Post } from '../../components/post';
import api from '../../utils/api';
import { Container } from '@mui/system';
import { PostsContext, PostsContextType } from '../../contexts/posts-context';
// const POST_ID = '645f59d8e0bf2c519ba489f9';

export function SinglePostPage() {
	const { onPostLike } = useContext(PostsContext) as PostsContextType;
	const postData = useLoaderData() as Post;
	const [post, setPost] = useState<Post | null>(null);
	useEffect(() => {
		setPost(postData);
	}, [postData]);

	function handlePostLike(post: PostLikeParam) {
		onPostLike(post).then((updatePost) => {
			console.log('updatePost', updatePost);
			setPost(updatePost);
		});
	}

	return (
		<>
			<Container maxWidth='lg'>
				<Post {...(post as Post)} onPostLike={handlePostLike} />
			</Container>
		</>
	);
}
export const singlePostLoader = async ({ params }: LoaderFunctionArgs) => {
	console.log(params.postId);
	return api.getPostById(params.postId as string);
};
