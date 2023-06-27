import { Stack, TextField } from '@mui/material';
import { FC } from 'react';
import { usePostsSearchForm } from './helpers/usePostsSearchForm';
import { SearchFilter } from 'pages/PostsPage';

export interface PostsSearchFormProps {
	setSearchFilter: (newSearchFilter: SearchFilter) => void;
}

export const PostsSearchForm: FC<PostsSearchFormProps> = ({
	setSearchFilter,
}) => {
	// Всю логику вынесли в кастомный хук. Это хорошая практика
	// отделять поведение от отображения
	const [localSearchValue, setLocalSearchValue] = usePostsSearchForm({
		setSearchFilter,
	});

	return (
		<Stack
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ mb: 5 }}>
			<TextField
				value={localSearchValue}
				onChange={(e) => setLocalSearchValue(e.target.value)}
				label='Search'
				variant='standard'
				sx={{ width: 240 }}
			/>
		</Stack>
	);
};
