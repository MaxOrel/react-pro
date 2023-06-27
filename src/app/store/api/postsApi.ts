import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './config';
import { Post } from 'models/postModel';
import { User } from 'models/userModel';

// Интерфейс для типизации объекта поста, приходящего с сервера
type BE_Post = Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt'> & {
	_id: Post['id'];
	created_at: Post['createdAt'];
	updated_at: Post['updatedAt'];
	author: Omit<User, 'id'> & {
		_id: User['id'];
	};
};

// При использовании пагинации, бэк присылает
// данные в следующем формате
interface BE_PostsResponse {
	postLength: number;
	posts: BE_Post[];
	total: number;
}

// Желаемый формат данных от бэека при использовании пагинации
interface PostsResponse extends Omit<BE_PostsResponse, 'posts'> {
	posts: Post[];
}

// Вспомогательная утилита, которая преобразует объект поста
// приходящего с бэка, в объект поста, который нужен фронтУ
const mapBackendPostToFrontend = ({
	_id: postId,
	author: { _id: authorId, ...restAuthor },
	created_at,
	updated_at,
	...restPost
}: BE_Post): Post => {
	return {
		id: postId,
		author: {
			id: authorId,
			...restAuthor,
		},
		createdAt: created_at,
		updatedAt: updated_at,
		...restPost,
	};
};

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: customBaseQuery,
	// Теги нужны для корректной работы системы
	// инвалидации запросов (принудительная повторная отправка запроса)
	// Для этого на корневом уровне АПИ мы объявляем массив возможных тегов, с
	// которыми наша АПИшка будет иметь дело
	// Т.к. текущее АПИ атомарно (заточено только для работы с постами), то в нашем
	// массиве только один элемент
	tagTypes: ['Posts'],
	endpoints: (builder) => ({
		// Endpoint для получения списка постов
		getPosts: builder.query<
			PostsResponse,
			Pick<User, 'group'> & { searchPhrase: string; page: number }
		>({
			query: ({ group, searchPhrase, page }) => ({
				url: `v2/${group}/posts/paginate`,
				params: {
					page,
					// Для проекта с постами мы жестко зафиксировали, что одна
					// страница — это 12 элементов. Сделано это на основе макета и
					// здравой логики
					limit: 12,
					query: searchPhrase,
				},
			}),
			// Так как ключ кэширования по умолчанию формируется на основе всех
			// параметров, которые принимает endpoint, то нам нужно переопределить это поведение
			// По сути у нас одна — бесконечно длинная страница, которая состоит из
			// кусочков по 12 элементов. Поэтому мы формируем ключ кэширования на основе
			// имени endpointa + поисковой фразы
			serializeQueryArgs: ({ endpointName, queryArgs: { searchPhrase } }) => {
				return endpointName + searchPhrase;
			},
			// Полученные данные мы должны объединить с предыдущими данными в кэше, чтобы
			// получить единую страницу с результатом
			merge: (currentCache, newValue, { arg: { page } }) => {
				if (page === 1) return;
				currentCache.posts.push(...newValue.posts);
			},
			// Так как номер страницы теперь не является части ключа кэширования, то мы должны
			// самостоятельно определить момент, когда система должна отправить запрос к бэку
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
			// Здесь мы говорим, что запрос на получения постов должен быть
			// закэширован по тегу "Posts"
			providesTags: (result) => {
				return result
					? [
							// Здесь мы кэшируем все полученные посты, чтобы при переходе
							// на детальную страницу не загружать информацию о посте еще раз
							// Читай доку https://redux-toolkit.js.org/rtk-query/usage/pagination#automated-re-fetching-of-paginated-queries
							...result.posts.map(({ id }) => ({ type: 'Posts' as const, id })),
							// Так же мы кэшируем сам список
							{ type: 'Posts', id: 'PARTIAL-LIST' },
					  ]
					: // Так же мы кэшируем сам список
					  [{ type: 'Posts', id: 'PARTIAL-LIST' }];
			},
			transformResponse: (response: BE_PostsResponse) => {
				return {
					...response,
					posts: response.posts.map(mapBackendPostToFrontend),
				};
			},
		}),
		// Endpoint для получения конкретного поста
		getPost: builder.query<Post, Pick<User, 'group'> & Pick<Post, 'id'>>({
			query: ({ group, id }) => ({
				url: `v2/${group}/posts/${id}`,
			}),
			// Здесь мы кешируем конкретный пост, указывая ID-шник поста
			providesTags: (result) => [{ type: 'Posts', id: result?.id }],
			transformResponse: (response: BE_Post) => {
				return mapBackendPostToFrontend(response);
			},
		}),
		// Endpoint для создания нового поста
		createPost: builder.mutation<
			Post,
			Pick<Post, 'title' | 'image' | 'tags' | 'text'> & Pick<User, 'group'>
		>({
			// Из параметров вытаскиваем группу пользователя, она
			// нужна для формирования url. Все остальные параметры, это
			// ключи объекта для будущего поста, т.е тело запроса
			query: ({ group, ...body }) => ({
				url: `v2/${group}/posts`,
				method: 'POST',
				body,
			}),
			// После успешного выполнения запроса мы инвалидируем
			// тег [{type: "Posts", id: 'PARTIAL-LIST{]. Это заставит RTK Query заново отправить запрос
			// на получения списка постов, а там как раз будет свежеиспеченный пост,
			// который мы и увидим на странице постов
			// При этом, если мы посещали какие-то детальные страницы,
			// то их кэш сохранится
			invalidatesTags: [{ type: 'Posts', id: 'PARTIAL-LIST' }],
		}),
		deletePost: builder.mutation<
			BE_Post,
			Pick<User, 'group'> & Pick<Post, 'id'>
		>({
			query({ group, id }) {
				return {
					url: `v2/${group}/posts/${id}`,
					method: 'DELETE',
				};
			},
			// После успешного удаления поста инвалидируем запросы на получения списка постов и
			// детальной страницы удаленного поста. Мы ведь не хотим заново открыть пость и увидеть
			// его содержимое из кэша
			invalidatesTags: (result) => [
				{ type: 'Posts', id: result?._id },
				{ type: 'Posts', id: 'PARTIAL-LIST' },
			],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostQuery,
	useCreatePostMutation,
	useDeletePostMutation,
} = postApi;
