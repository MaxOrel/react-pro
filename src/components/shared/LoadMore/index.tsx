import { Alert, CircularProgress, Stack } from '@mui/material';
import { FC, useLayoutEffect, useRef } from 'react';

interface LoadMoreProps {
	action: () => void;
	isLoading?: boolean;
	isEndOfList?: boolean;
}

export const LoadMore: FC<LoadMoreProps> = ({
	action,
	isLoading,
	isEndOfList,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	// Используем useLayoutEffect для того, чтобы зарегистрировать
	// observer до того момента, когда разметка отобразиться на экране
	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;

		// Если мы не достигли конца списка, то запускаем инициализацию
		// IntersectionObserver
		if (!isEndOfList) {
			// Определяем настройка для будущего наблюдателя
			// Читай доку https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
			const options: IntersectionObserverInit = {
				threshold: 0.5,
			};

			// Функция, которая будет вызываться каждый раз, когда элемент будет
			// появляться на экране и исчезать
			const callback: IntersectionObserverCallback = (entries) => {
				// Для того чтобы отследить именно появление элемента в области видимости,
				// используем свойство isIntersecting
				if (entries[0].isIntersecting) {
					// запускаем пользовательскую логику
					action();
				}
			};
			// создаем экземпляр класса IntersectionObserver
			observer = new IntersectionObserver(callback, options);

			// Если ссылка есть, то начинаем наблюдать за нашим элементом
			ref.current && observer.observe(ref.current);
		}

		return () => {
			// Перед последующем запуском useLayoutEffect перестаем следить
			// за всеми элементами
			observer && observer.disconnect();
		};
	}, [action, isEndOfList]);

	return (
		<Stack
			ref={ref}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ mb: 5 }}>
			{isLoading && <CircularProgress />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
