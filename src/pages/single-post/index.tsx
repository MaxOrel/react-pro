import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../components/post';
import api from '../../utils/api';
import { Container } from '@mui/system';
import { Spinner } from '../../components/spinner';
import { NotFoundPage } from '../not-found';
// const POST_ID = '645f59d8e0bf2c519ba489f9';

type SinglePostProps = {
	onPostDelete: (id: string) => void;
	onPostLike: ({ _id, likes }: PostLikeParam) => Promise<Post>;
	currentUser: User | null;
};

export function SinglePostPage({
	currentUser,
	onPostLike,
	onPostDelete,
}: SinglePostProps) {
	const { postId } = useParams<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [post, setPost] = useState<Post | null>(null);
	const [errorState, setErrorState] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		if (postId)
			api
				.getPostById(postId)
				.then((postData) => {
					setPost(postData);
				})
				.catch((err) => {
					setErrorState(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
	}, []);

	function handlePostLike(post: PostLikeParam) {
		onPostLike(post).then((updatePost) => {
			console.log('updatePost', updatePost);
			setPost(updatePost);
		});
	}

	return (
		<>
			{!errorState &&
				(isLoading ? (
					<Spinner />
				) : (
					<Container maxWidth='lg'>
						<Post
							{...(post as Post)}
							currentUser={currentUser}
							onPostLike={handlePostLike}
							onPostDelete={onPostDelete}
						/>
					</Container>
				))}
			{errorState && <NotFoundPage />}
		</>
	);
}
