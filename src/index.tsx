import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from '@mui/material';
import { theme } from './app/theme';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
