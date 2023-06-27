import { ComponentType, FC } from 'react';

// Эти props'ы нужны для логики HOC'a
interface WithHocProps {
	prop1: boolean;
	prop2: string;
	// и т.д.
}

// ComponentType — это generic, который предоставляет реакт
// Он помогает типизировать как функциональные, так и классовые компоненты
export const withHoc = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	// HOC должен вернуть новый компонент с дополнительным поведением
	const ReturnedComponent: FC<WithHocProps & P> = (props) => {
		// достаем пропсы, которые предназначались HOC'у
		// Остальные пропсы собираем с помощью rest-оператора и отправляем их
		// Оборачиваемому компоненту
		const { prop1, prop2, ...rest } = props;

		// тут пишем какую-то логику
		if (prop1) {
			console.log('Prop1 is true');
		}

		// тут пишем какую-то логику
		if (prop2 === 'Hello') {
			console.log('world');
		}

		// В конце возвращаем оборачиваемый компонент. Прокидываем в него
		// пропсы, которые ему предназначались
		return <WrappedComponent {...(rest as P)} />;
	};

	// Указываем displayName для возвращаемого из HOC'a компонента
	// Имя формируем на основе названия HOC'a и названия оборачиваемого компонента
	ReturnedComponent.displayName = `withHoc${getDisplayName(WrappedComponent)}`;
	return ReturnedComponent;
};

function getDisplayName<P extends object>(WrappedComponent: ComponentType<P>) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
