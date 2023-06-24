import {
	derementByValue,
	incrementByValue,
} from '../../storage/reducers/counter/counter-slice';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

const CounterPage = () => {
	const counter = useSelector((state) => state.counter);
	const dispatch = useDispatch();

	const increment = () => {
		dispatch(incrementByValue(1));
	};
	const decrease = () => {
		dispatch(derementByValue(1));
	};

	return (
		<div className='block'>
			<h1>Счетчик: {counter}</h1>
			<div className='btns'>
				<button onClick={() => increment()}>Добавить</button>
				<button onClick={() => decrease()}>Убавить</button>
			</div>
		</div>
	);
};

export default CounterPage;
