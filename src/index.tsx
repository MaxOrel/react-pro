import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { App } from './components/app';
import './index.css';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
