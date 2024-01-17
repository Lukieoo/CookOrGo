// W pliku np. AuthService.js
const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem('jwtToken', token);
            console.log('Zalogowano pomyślnie. Token:', token);
            return token;
        } else if (response.status === 401) {
            console.log('Błędne dane logowania. Spróbuj ponownie.');
            return null;
        } else {
            console.error('Wystąpił błąd podczas logowania.');
            console.error('Błąd HTTP:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error);
        return null;
    }
};
const register = async (email, username, password) => {
    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: username,
                password: password,
                roles: "ROLE_USER",
            }),
        });

        if (response.ok) {
            const token = await response.text();
            console.log('Rejestracja udana.', token);
            return true;
        } else {
            console.error('Wystąpił błąd podczas rejestracji.');
            console.error('Błąd HTTP:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error);
        return false;
    }
};

export {login, register};