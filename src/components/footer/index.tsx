import { Box, Container, SpeedDial, SpeedDialAction } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ActionsContext } from '../../contexts/actions-context';

export function Footer() {
	const { quickActions } = useContext(ActionsContext) || {};

	return (
		<>
			<Box
				component='footer'
				sx={{
					padding: '25px 0',
				}}>
				<Container maxWidth='lg'>&copy; {dayjs().year()}</Container>
			</Box>
			<SpeedDial
				ariaLabel='SpeedDial'
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}>
				{quickActions?.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
					/>
				))}
			</SpeedDial>
		</>
	);
}
