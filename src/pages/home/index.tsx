import { Container, Stack, Switch, Typography } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PostsList } from '../../components/posts-list';
import {
	ActionContextType,
	ActionsContext,
} from '../../contexts/actions-context';

export function HomePage() {
	const [isMasonry, setIsMasonry] = useState<boolean>(false);
	const { setQuickActions } = useContext(ActionsContext) as ActionContextType;

	function handleSwitchChange(event: ChangeEvent<HTMLInputElement>) {
		setIsMasonry(event.target.checked ? true : false);
	}

	useEffect(() => {
		setQuickActions([
			{
				icon: (
					<Link className='speed-dial__action' to='/add-post'>
						<AddOutlinedIcon />
					</Link>
				),
				name: 'Добавить',
			},
		]);
	}, []);

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
