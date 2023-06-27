import { Container, Typography } from '@mui/material';
import { withProtection } from 'HOCs/withProtection';
import { withQuery } from 'HOCs/withQuery';
import { useGetPostQuery } from 'app/store/api/postsApi';
import { userSelector } from 'app/store/slices/userSlice';
import { PostDetail } from 'components/posts/PostDetail';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { getMessageFromError } from 'utils/errorUtils';

// Вот и наш защитник правопорядка - withProtection
export const PostPage: FC = withProtection(() => {
	const { postId } = useParams();
	const user = useAppSelector(userSelector);

	const { data, isError, isLoading, error, refetch } = useGetPostQuery(
		{ group: user.group, id: postId! },
		{
			skip: !user.group || !postId,
		}
	);

	return (
		<Container>
			<Typography component='h1' variant='h4' textAlign='center' sx={{ mb: 5 }}>
				Post Detail
			</Typography>
			{withQuery(PostDetail)({
				isError, // этот prop нужен для HOC'a
				isLoading, // этот prop нужен для HOC'a
				error: getMessageFromError(
					error,
					'Unknown error when trying to load list of posts'
				), // этот prop нужен для HOC'a
				refetch, // этот prop нужен для HOC'a
				...data!,
			})}
		</Container>
	);
});
