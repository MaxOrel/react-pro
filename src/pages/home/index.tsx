import { Container, Stack, Switch, Typography } from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { ChangeEvent, useState } from 'react';

export function HomePage() {
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
				<PostsList type={isMasonry ? 'masonry' : 'grid'} />
			</Container>
		</>
	);
}
