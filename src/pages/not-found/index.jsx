import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './not-found.module.css';

export function NotFoundPage() {
	return (
		<>
			<Container maxWidth='md'>
				<p className={classNames(styles.digits)}>404</p>
				<h1 className={classNames(styles.title)}>Страница не найдена</h1>
				<p className={classNames(styles.message)}>
					Возможно, она была перемещена, или вы просто неверно указали адрес
					страницы.
				</p>
				<p className={classNames(styles.links)}>
					<Link to='/'>Перейти на главную</Link>
				</p>
			</Container>
		</>
	);
}
