import {
	decreaseAction,
	incrementAction,
} from '../../storage/actions/counterActions';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

const CounterPage = () => {
	const storage = useSelector((state) => state);
	const dispatch = useDispatch();

	const increment = () => {
		dispatch(incrementAction());
	};
	const decrease = () => {
		dispatch(decreaseAction());
	};

	return (
		<div className='block'>
			<h1>Счетчик: {storage.counter.value}</h1>
			<div className='btns'>
				<button onClick={() => increment()}>Добавить</button>
				<button onClick={() => decrease()}>Убавить</button>
			</div>
		</div>
	);
};

export default CounterPage;
