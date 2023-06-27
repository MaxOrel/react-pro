import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface BE_User {
	_id: string;
	name: string;
	middleName: string;
	lastName: string;
	phone: string;
}

export interface User extends Omit<BE_User, '_id'> {
	id: BE_User['_id'];
}

export const phonesApi = createApi({
	reducerPath: 'phonesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://link.to/your/backend/', // базовый url, который будет участвовать в конкатенации
	}),
	// Теги нужны для корректной работы системы
	// инвалидации запросов (принудительная повторная отправка запроса)
	// Для этого на корневом уровне АПИ мы объявляем массив возможных тегов, с
	// которыми наша АПИшка будет иметь дело
	// Т.к. текущее АПИ атомарно (заточено только для работы с телефонным справочником), то в нашем
	// массиве только один элемент
	tagTypes: ['Phones'],
	endpoints: (builder) => ({
		// Endpoint для получения телефонного справочника
		// Первым generic'ом указываем "желаемый" интерфейс ответ от бэка
		// Вторым generic'ом указываем, что будет принимать наш кастомный хук
		getPhones: builder.query<User[], { searchPhrase: string }>({
			query: ({ searchPhrase }) => ({
				url: 'phones', // Произойдет конкатенация baseUrl в fetchBaseQuery + url + params = https://link.to/your/backend/phones?query=<searchPhrase>
				params: {
					// Query-параметры, которые добавяться в GET-запрос
					query: searchPhrase,
				}, // Если не указываем метод запроса, то по умолчанию стоит GET
			}),
			// Здесь мы говорим, что запрос на получения телефонного справочника должен быть
			// закэширован по тегу "Phones"
			providesTags: ['Phones'],
			// Преобразуем настоящий ответ сервера в "желаемый"
			transformResponse: (response: BE_User[]) =>
				response.map(mapBackendUserToFrontend),
		}),
		// Endpoint для создания элемента телефонного справочника
		// Первым generic'ом указываем "желаемый" интерфейс ответ от бэка
		// Вторым generic'ом указываем, что будет принимать наш кастомный хук
		createPhone: builder.mutation<User, Omit<User, 'id'>>({
			query: (newUser) => ({
				url: 'phones',
				method: 'POST',
				body: newUser,
			}),
			// После выполнения запроса делаем инвалидацию по тегу "Phones"
			// Таким образом RTK Query отправит запрос на получения списка телефонов отправится повторно,
			// а там как раз будет наш новый элемент
			invalidatesTags: ['Phones'],
			// Преобразуем настоящий ответ сервера в "желаемый"
			transformResponse: (response: BE_User) =>
				mapBackendUserToFrontend(response),
		}),
	}),
});

export const { useGetPhonesQuery, useCreatePhoneMutation } = phonesApi;

// Вспомогательная утилита, которая преобразует объект пользователя
// приходящего с бэка, в объект поста, который нужен фронту
const mapBackendUserToFrontend = ({ _id, ...restUser }: BE_User): User => {
	return {
		id: _id,
		...restUser,
	};
};
