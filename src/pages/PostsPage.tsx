import { Container, Typography } from '@mui/material';
import { withProtection } from 'HOCs/withProtection';
import { withQuery } from 'HOCs/withQuery';
import { useGetPostsQuery } from 'app/store/api/postsApi';
import { userSelector } from 'app/store/slices/userSlice';
import { PostsSearchForm } from 'components/forms/PostsSearchForm';
import { PostList } from 'components/posts/PostList';
import { LoadMore } from 'components/shared/LoadMore';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC, useCallback, useState } from 'react';
import { getMessageFromError } from 'utils/errorUtils';

export interface SearchFilter {
	searchPhrase: string;
	page: number;
}

// Вот и наш защитник правопорядка - withProtection
export const PostsPage: FC = withProtection(() => {
	// создаем состояние, в котором будем хранить фильтр для поиска
	const [searchFilter, setSearchFilter] = useState<SearchFilter>({
		searchPhrase: '',
		page: 1,
	});

	// Достаем текущего изера из redux'a, он нам нужен,
	// чтобы достать у него поле group, которое в свою очередь
	// нужно для формирования url запроса
	const user = useAppSelector(userSelector);

	// Инициализируем запрос на получения постов
	const { data, isError, isLoading, isFetching, error, refetch } =
		useGetPostsQuery(
			// Первый аргумент — объект параметров для запроса
			{ group: user.group, ...searchFilter },
			// Второй аргумент — настройки запроса
			{
				// ключ skip (как понятно из названия), пропускает запрос при условии
				// в нашем условии мы говорим, что запрос НЕ будет произведен,
				// если НЕТ группы пользователя
				// Группа пользователя нам нужна по документации нашей АПИшки
				skip: !user.group,
			}
		);

	const isEndOfList = data && data.posts.length >= data.total;

	const loadMorePosts = useCallback(() => {
		if (!isEndOfList)
			setSearchFilter((prev) => ({ ...prev, page: prev.page + 1 }));
	}, [isEndOfList]);

	return (
		<Container>
			<Typography component='h1' variant='h4' textAlign='center' sx={{ mb: 5 }}>
				Posts Page
			</Typography>
			{/* Выносим инпут поиска постов в отдельный компонент для инкапсуляции логики */}
			<PostsSearchForm setSearchFilter={setSearchFilter} />
			{/* Используем HOC, который включает в себя дополнительную логику
        при взаимодействии с сетевыми запросами. В этом HOC'е мы отображаем ошибки и
        индикатор загрузки
      */}
			{withQuery(PostList)({
				isError, // этот prop нужен для HOC'a
				isLoading: isLoading, // этот prop нужен для HOC'a
				error: getMessageFromError(
					error,
					'Unknown error when trying to load list of posts'
				), // этот prop нужен для HOC'a
				refetch, // этот prop нужен для HOC'a
				posts: data?.posts ?? [], // этот prop нужен для компонента PostList !!! <<<<<<<<<<<<<<<<<<
			})}
			{/* Показываем компонент, только после того, как получили ответ от сервера */}
			{data && (
				<LoadMore
					isLoading={isFetching}
					action={loadMorePosts}
					isEndOfList={isEndOfList}
				/>
			)}
		</Container>
	);
});
