// W pliku np. AuthService.js
const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/auth/authenticate', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            // Tutaj możesz zaimplementować logikę zapisywania tokena w lokalnym stanie (np. localStorage)
            console.log('Zalogowano pomyślnie. Token:', token);
            return token;
        } else if (response.status === 401) {
            console.log('Błędne dane logowania. Spróbuj ponownie.');
            return null;
        } else {
            console.error('Wystąpił błąd podczas logowania.');
            return null;
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error);
        return null;
    }
};

export { login };