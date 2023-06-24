import Masonry from '@mui/lab/Masonry';
import { PostCard } from '../post-card';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import usePagination from '../../hooks/usePagination';
import { useAppSelector } from '../../storage/hook';
import { selectPosts } from '../../storage/reducers/post/selectors';

type PostListProps = {
	type: string;
};
export function PostsList({ type }: PostListProps) {
	const posts = useAppSelector(selectPosts);
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
							<PostCard key={item._id} {...item} />
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
							<PostCard {...item} />
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
