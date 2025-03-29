import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';


const poolData = {
    UserPoolId: 'us-east-1_GVHmDiDks', // Reemplaza con tu User Pool ID
    ClientId: '1riqa4eldct3ivachpuvsjkgb8', // Reemplaza con tu App Client ID
};

const userPool = new CognitoUserPool(poolData);


export const signIn = (username, password) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: username, Pool: userPool });
        const authDetails = new AuthenticationDetails({ Username: username, Password: password });

        user.authenticateUser(authDetails, {
            onSuccess: (session) => {
                console.log('Login exitoso', session);
                resolve(session);
            },
            onFailure: (err) => {
                console.error('Error de inicio de sesión', err);
                reject(err);
            },
        });
    });
};
