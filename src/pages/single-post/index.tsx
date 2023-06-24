import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Post } from '../../components/post';
import { Container } from '@mui/system';
import { useAppDispath, useAppSelector } from '../../storage/hook';
import { fetchSinglePost } from '../../storage/reducers/single-post/single-post-slice';
import {
	selectSinglePost,
	selectSinglePostLoading,
} from '../../storage/reducers/single-post/selectors';
import { Spinner } from '../../components/spinner';
// const POST_ID = '645f59d8e0bf2c519ba489f9';

export function SinglePostPage() {
	const { postId } = useParams();
	const dispatch = useAppDispath();
	const post = useAppSelector(selectSinglePost);
	const postIsLoading = useAppSelector(selectSinglePostLoading);
	useEffect(() => {
		if (postId) dispatch(fetchSinglePost(postId));
	}, [dispatch, postId]);

	return (
		<>
			<Container maxWidth='lg'>
				{postIsLoading ? <Spinner /> : <Post {...(post as Post)} />}
			</Container>
		</>
	);
}
