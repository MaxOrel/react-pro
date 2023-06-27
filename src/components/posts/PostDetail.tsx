import { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Post } from 'models/postModel';
import { Button, Grid, Stack } from '@mui/material';
import { dateFormatter } from 'utils/time';
import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from 'app/store/api/postsApi';
import { useAppSelector } from 'hooks/useAppSelector';
import { userSelector } from 'app/store/slices/userSlice';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { getMessageFromError } from 'utils/errorUtils';

export const PostDetail: FC<Post> = ({
	title,
	text,
	author,
	likes,
	image,
	createdAt,
	id,
}) => {
	const navigate = useNavigate();
	const user = useAppSelector(userSelector);

	const [deletePostRequest, { isLoading }] = useDeletePostMutation();

	const deleteHandler = async () => {
		try {
			await deletePostRequest({ group: user.group, id }).unwrap();
			toast.success('Пост успешно удален');
			navigate('/posts');
		} catch (error) {
			toast.error(
				getMessageFromError(error, 'Не известная ошибка при удалении поста')
			);
		}
	};

	return (
		<Grid
			item
			container
			direction='column'
			justifyContent='center'
			alignItems='center'>
			<Card
				elevation={1}
				sx={{
					maxWidth: 345,
					minWidth: 345,
					display: 'flex',
					flexFlow: 'column',
					height: '100%',
				}}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: deepPurple[300] }} aria-label='recipe'>
							{author.name[0]}
						</Avatar>
					}
					title={title}
					subheader={dateFormatter.format(new Date(createdAt))}
				/>
				<CardMedia component='img' height='194' image={image} alt={title} />
				<CardContent>
					<Typography variant='body2' color='text.secondary'>
						{text}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}
					disableSpacing>
					<Stack direction='row' alignItems='center' useFlexGap spacing={1}>
						<IconButton aria-label='add to favorites'>
							<FavoriteIcon />
						</IconButton>
						<Typography sx={{ color: 'grey.500' }}>{likes.length}</Typography>
					</Stack>
					<Stack direction='row' useFlexGap spacing={1}>
						<Button
							onClick={() => navigate('..', { relative: 'path' })}
							color='primary'
							variant='contained'>
							Back
						</Button>
						<LoadingButton
							color='error'
							variant='contained'
							loading={isLoading}
							disabled={isLoading}
							onClick={deleteHandler}>
							Delete
						</LoadingButton>
					</Stack>
				</CardActions>
			</Card>
		</Grid>
	);
};
