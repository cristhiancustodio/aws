import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import { Box, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from "./components/ui/provider"

import { Toaster } from './components/ui/toaster.jsx';
import { AuthProvider } from 'react-oidc-context';
import { ColorModeProvider } from './components/ui/color-mode';




const cognitoAuthConfig = {
	authority: '',
	client_id: '',
	redirect_uri: '',
	response_type: '',
	scope: '',
};


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider value={defaultSystem}>

			<Toaster />
			<Box p={2}>
				<AuthProvider {...cognitoAuthConfig}>
					<App />
				</AuthProvider>
			</Box>
		</ChakraProvider>
	</StrictMode>,
)
