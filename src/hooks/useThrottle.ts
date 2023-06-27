import { useEffect, useRef, useState } from 'react';

// хук useThrottle ожидает два параметра
// Обратите внимание на использование generic типа!!!
// Это нужно для корректной типизации
interface useThrottle<ValueType> {
	value: ValueType;
	// delay in ms
	delay: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useThrottle = <ValueType = unknown>({
	value,
	delay,
}: useThrottle<ValueType>) => {
	// Создаем локальное состояние, которое будем через равные промежутки времени
	const [throttledValue, setThrottledValue] = useState(value);

	// Ref — это наш помощник. В нем мы храним последнее значение value, которое попало в наш
	// хук, а также текущее состояние ожидания setTimeout'a.
	// Используем ref из-за того, что его обновления не приводят к ре-рендеру
	const ref = useRef({
		value,
		inProgress: false,
	});

	// Вся логика здесь
	useEffect(() => {
		// Сохраняем последнее состояние value
		ref.current.value = value;
		// Если мы ожидаем выполнения setTimeout'a, то останавливаемся на данной строке
		// и дальше не идем
		if (ref.current.inProgress) return;

		// Если дошли до этой строки, то мы сразу запоминаем, что нужно будет дождаться
		// setTimeout'a
		ref.current.inProgress = true;

		// запуск setTimeout'a
		setTimeout(() => {
			// Когда тело будет выполняться, мы обновим наше локальное состояние,
			// актуальным значением из ref'a
			setThrottledValue(ref.current.value);
			// И не забудем заменить флаг ожидания на false
			ref.current.inProgress = false;
		}, delay);
	}, [delay, value]);

	return throttledValue;
};
