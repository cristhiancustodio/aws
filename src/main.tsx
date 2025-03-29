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
	authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GVHmDiDks",
	client_id: "1riqa4eldct3ivachpuvsjkgb8",
	redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
	response_type: "code",
	scope: "email openid phone",
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
