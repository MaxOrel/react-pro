import { Container, Stack, Switch, Typography } from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { ChangeEvent, useState } from 'react';

type HomePageProps = {
	posts: Post[];
	onPostDelete: (id: string) => void;
	onPostLike: ({ id, likes }: any) => void;
	currentUser: User | null;
};

export function HomePage({
	posts,
	onPostDelete,
	onPostLike,
	currentUser,
}: HomePageProps) {
	const [isMasonry, setIsMasonry] = useState<boolean>(false);

	function handleSwitchChange(event: ChangeEvent<HTMLInputElement>) {
		setIsMasonry(event.target.checked ? true : false);
	}

	return (
		<>
			<Container maxWidth='lg'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography>Grid</Typography>
					<Switch
						checked={isMasonry}
						value='masonry'
						onChange={handleSwitchChange}
						name='masonry'
					/>
					<Typography>Masonry</Typography>
				</Stack>
				<PostsList
					type={isMasonry ? 'masonry' : 'grid'}
					posts={posts}
					onPostDelete={onPostDelete}
					onPostLike={onPostLike}
					currentUser={currentUser}
				/>
			</Container>
		</>
	);
}
