import { useSearchParams } from 'react-router-dom';
import { POSTS_SEARCH_PARAMS_KEY } from './constants';
import { useEffect, useState } from 'react';
import { PostsSearchFormProps } from '..';
import { useDebounce } from 'hooks/useDebounce';
// import { useThrottle } from 'hooks/useThrottle'

export const usePostsSearchForm = ({
	setSearchFilter,
}: PostsSearchFormProps) => {
	// Из react-router-dom'a достаем сущности, которые помогут нам взаимодействовать
	// с URLSearchParams https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	const [searchParams, setSearchParams] = useSearchParams();

	// Локальное состояние, которое обновляется при каждом введенном символе
	const [localSearchValue, setLocalSearchValue] = useState(() => {
		// При первоначальной загрузке компонента обращаемся к URLSearchParams и пробуем
		// из url адреса получить значение для нашей сущности searchPhrase
		return searchParams.get(POSTS_SEARCH_PARAMS_KEY) ?? '';
	});

	const optimizedValue = useDebounce({ value: localSearchValue, delay: 500 });

	// Следим за изменением оптимизированного состояния
	// Оно меняется не так часто, как локальное состояние
	useEffect(() => {
		setSearchFilter({
			searchPhrase: optimizedValue,
			page: 1,
		});
	}, [optimizedValue, setSearchFilter]);

	// После каждого напечатанного символа, нам нужно обновить url-строку и зафиксировать
	// текущее состояние поисковой фразы
	useEffect(() => {
		// Если поисковая фраза есть
		if (localSearchValue) {
			// то добавляем ее в URLSearchParams по указанному ключу
			searchParams.set(POSTS_SEARCH_PARAMS_KEY, localSearchValue);
		} else {
			// если поисковая фраза отсутствует, либо она представляет из себя
			// пустую строку, то удаляем ключ из URLSearchParams
			searchParams.delete(POSTS_SEARCH_PARAMS_KEY);
		}

		setSearchParams(searchParams);
	}, [searchParams, localSearchValue, setSearchParams]);

	return [localSearchValue, setLocalSearchValue] as const;
};
