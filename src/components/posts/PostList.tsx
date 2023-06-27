import { Post } from 'models/postModel';
import { FC } from 'react';
import { PostListItem } from './PostListItem';
import { Grid, Typography } from '@mui/material';

export const PostList: FC<{ posts: Post[] }> = ({ posts }) => {
	if (!posts.length) return <Typography>Post list is empty</Typography>;

	return (
		<Grid
			container
			spacing={3}
			justifyContent='center'
			alignItems='stretch'
			sx={{ mb: 6 }}>
			{posts.map((post) => (
				<PostListItem key={post.id} {...post} />
			))}
		</Grid>
	);
};
