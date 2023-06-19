import Masonry from '@mui/lab/Masonry';
import { PostCard } from '../post-card';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import usePagination from '../../hooks/usePagination';

type PostListProps = {
	posts: Post[];
	type: string;
	onPostDelete: (id: string) => void;
	onPostLike: ({ _id, likes }: PostLikeParam) => Promise<Post>;
	currentUser: User | null;
};
export function PostsList({
	posts,
	type,
	onPostDelete,
	onPostLike,
	currentUser,
}: PostListProps) {
	const PER_PAGE = 12;
	const count = Math.ceil(posts.length / PER_PAGE);
	const { currentPage, currentData, setPagePaginate } = usePagination<Post>(
		posts,
		PER_PAGE
	);

	const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
		setPagePaginate(page);
	};

	return (
		<>
			{type === 'masonry' ? (
				<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
					<>
						{currentData().map((item) => (
							<PostCard
								key={item._id}
								{...item}
								onPostLike={onPostLike}
								currentUser={currentUser}
								onPostDelete={onPostDelete}
							/>
						))}
					</>
				</Masonry>
			) : (
				<Grid container spacing={2}>
					{currentData().map((item) => (
						<Grid
							sx={{ display: 'flex' }}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={item._id}>
							<PostCard
								{...item}
								onPostLike={onPostLike}
								currentUser={currentUser}
								onPostDelete={onPostDelete}
							/>
						</Grid>
					))}
				</Grid>
			)}

			<Stack spacing={2} sx={{ marginTop: 2 }}>
				<Typography>Страница {currentPage}</Typography>
				<Pagination
					count={count}
					page={currentPage}
					onChange={handlePageChange}
				/>
			</Stack>
		</>
	);
}
