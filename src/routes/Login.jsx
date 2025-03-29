import { Box, Button, Spinner, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "react-oidc-context";

function Login() {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "1riqa4eldct3ivachpuvsjkgb8";
        const logoutUri = "http://localhost:5173/";
        const cognitoDomain = "https://us-east-1gvhmdidks.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <Box><Text><Spinner color="teal.500" size="sm" /> Loading...</Text></Box>;
    }

    if (auth.error) {
        return <Box>Encountering error... {auth.error.message}</Box>;
    }

    if (auth.isAuthenticated) {
        return (
            <Box>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>
                <Button onClick={() => auth.removeUser()}>Sign out</Button>            
            </Box>
        );
    }

    return (
        <Box spaceX={2}>
            <Button onClick={() => auth.signinRedirect()}>Sign in</Button>
            <Button onClick={() => signOutRedirect()}>Sign out</Button>
        </Box>
    );
}

export default Login;