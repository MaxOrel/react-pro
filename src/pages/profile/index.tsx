import {
	Avatar,
	Button,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { MouseEvent, useContext } from 'react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from './profile.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { UserContext } from '../../contexts/user-context';
import { PostsContext, PostsContextType } from '../../contexts/posts-context';

export function ProfilePage() {
	const currentUser = useContext(UserContext);
	const { onPostDelete, posts } = useContext(PostsContext) as PostsContextType;

	function handleDeleteClick(e: MouseEvent<HTMLElement>) {
		e.preventDefault();
		const el = (e.target as HTMLElement).closest('.post') as HTMLElement;
		onPostDelete(el.dataset.id as string);
	}

	return (
		<Container maxWidth='lg'>
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<div className={styles.info}>
						<Avatar
							alt={currentUser?.name}
							src={
								currentUser?.avatar
									? currentUser.avatar
									: '/static/images/avatar/1.jpg'
							}
							sx={{ width: 150, height: 150 }}
							className={styles.avatar}
						/>
						<p>{currentUser?.name}</p>
						<p>{currentUser?.about}</p>
					</div>

					<div className={styles.actions}>
						<Button variant='outlined'>Редактировать профиль</Button>
						<Button variant='outlined' color='secondary'>
							Изменить аватар
						</Button>
					</div>
				</Grid>
				<Grid item xs={12} md={8}>
					<>
						<Typography variant='h4' component='h2'>
							Мои посты
						</Typography>
						<List sx={{ width: '100%' }}>
							{posts?.map(
								(item, index) =>
									item.author._id === currentUser?._id && (
										<ListItem
											key={index}
											data-id={item?._id}
											data-published={item?.isPublished}>
											<ListItemIcon>
												<ArticleOutlinedIcon />
											</ListItemIcon>
											<ListItemText
												primary={item.title}
												secondary={
													<span className={styles.postMeta}>
														<span>
															Добавлено:{' '}
															{dayjs(item.created_at)
																.locale('ru')
																.format('D MMMM YYYY HH:mm')}
														</span>
														<span>
															Обновлено:{' '}
															{dayjs(item.updated_at)
																.locale('ru')
																.format('D MMMM YYYY HH:mm')}
														</span>
													</span>
												}
											/>
											<div className={styles.postActionWrapper}>
												<IconButton
													className={styles.postAction}
													edge='end'
													aria-label='publish'>
													{item.isPublished ? (
														<VisibilityOutlinedIcon />
													) : (
														<VisibilityOffOutlinedIcon />
													)}
												</IconButton>

												<IconButton
													className={styles.postAction}
													edge='end'
													aria-label='edit'>
													<EditOutlinedIcon />
												</IconButton>

												<IconButton
													className={styles.postAction}
													onClick={handleDeleteClick}
													edge='end'
													aria-label='delete'>
													<DeleteOutlinedIcon />
												</IconButton>
											</div>
										</ListItem>
									)
							)}
						</List>
					</>
				</Grid>
			</Grid>
		</Container>
	);
}
