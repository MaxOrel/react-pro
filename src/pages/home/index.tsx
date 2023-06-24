import { Container, Stack, Switch, Typography } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PostsList } from '../../components/posts-list';
import {
	ActionContextType,
	ActionsContext,
} from '../../contexts/actions-context';
import { selectUser } from '../../storage/reducers/user/selectors';
import { selectPosts } from '../../storage/reducers/post/selectors';
import { useAppSelector } from '../../storage/hook';
import { Spinner } from '../../components/spinner';

export function HomePage() {
	const [isMasonry, setIsMasonry] = useState<boolean>(false);
	const posts = useAppSelector(selectPosts);
	const user = useAppSelector(selectUser);
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
				{!posts || !user ? (
					<Spinner />
				) : (
					<PostsList type={isMasonry ? 'masonry' : 'grid'} />
				)}
			</Container>
		</>
	);
}
