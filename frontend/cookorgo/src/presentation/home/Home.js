import React, {useEffect, useState} from 'react';
import burger from '../../ui/burger.png';
import logo from '../../ui/logo.png';
import '../main/App.css';
import {login, register} from './AuthService';

function Home() {


    const [isModalVisible, setModalVisibility] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [usernameLogin, setUsernameLogin] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [username, setUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [error, setError] = useState(null); // Nowy stan na błędy
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // Nowy stan na sukces rejestracji
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            setModalVisibility(false);
            setShowLogin(true);
            window.location.href = '../dashboard';
        }
    }, []);

    const closeModal = () => {
        setModalVisibility(false);
        setUsernameLogin('');
        setPassword('');
        setRegisterEmail('');
        setUsername('');
        setRegisterPassword('');
        setError(null);
        setRegistrationSuccess(false);
        setEmailError(null);
        setPasswordError(null);
    };

    const handleLogin = async () => {
        setError(null);
        if (!usernameLogin || !password) {
            setEmailError(!usernameLogin ? 'Pole e-mail nie może być puste.' : null);
            setPasswordError(!password ? 'Pole hasła nie może być puste.' : null);
            return;
        }

        const token = await login(usernameLogin, password);
        setEmailError(null);
        setPasswordError(null);
        if (token) {
            setModalVisibility(false);
            setShowLogin(true);
            window.location.href = '../dashboard';
            closeModal();
        } else {
            setError('Błędne dane logowania. Spróbuj ponownie.');
        }
    };


    const handleRegister = async () => {
        if (!registerEmail || !registerPassword || !username) {
            setEmailError(!registerEmail ? 'Pole e-mail nie może być puste.' : null);
            setPasswordError(!registerPassword ? 'Pole hasła nie może być puste.' : null);
            setError(!username ? 'Pole nazwy użytkownika nie może być puste.' : null);
            return;
        }
        const registrationResult = await register(registerEmail, username, registerPassword);
        setEmailError(null);
        setPasswordError(null);

        setError(null);
        if (registrationResult) {
            console.log('Rejestracja udana. Możesz się teraz zalogować.');
            setRegistrationSuccess(true);
            setShowLogin(true);
        } else {
            setError('Błąd rejestracji. Spróbuj ponownie.');
        }
    };
    const openRegister = () => {
        setShowLogin(false);
        setModalVisibility(true);
        setError(null);
        setRegistrationSuccess(false);
        setEmailError(null);
        setPasswordError(null);
    };
    return (
        <div className="app-container">
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo firmy" className="logo"/>
                </div>
                <div className="login-container">
                    <button className="login-button" onClick={() => {
                        setModalVisibility(true);
                        setShowLogin(true);
                    }}>
                        Login
                    </button>
                </div>
            </div>
            {isModalVisible && (
                <div className="modal">
                    <span className="close-modal" onClick={closeModal}>
                        &times;
                    </span>
                    {showLogin ? (
                        <>
                            <h2>Login</h2>
                            <label>Username:</label>
                            <input type="text" value={usernameLogin}
                                   onChange={(e) => setUsernameLogin(e.target.value)}/>
                            {emailError && <div className="error-message">{emailError}</div>}
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {passwordError && <div className="error-message">{passwordError}</div>}
                            <button onClick={handleLogin}>Zaloguj</button>
                            <p>Nie masz konta? <button onClick={() => {
                                setShowLogin(false)
                                setError(null)
                                setRegistrationSuccess(false)
                            }}>Zarejestruj się</button></p>
                        </>
                    ) : (
                        <>
                            <h2>Register</h2>
                            <label>Email:</label>
                            <input type="text" value={registerEmail}
                                   onChange={(e) => setRegisterEmail(e.target.value)}/>
                            {emailError && <div className="error-message">{emailError}</div>}
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label>Password:</label>
                            <input type="password" value={registerPassword}
                                   onChange={(e) => setRegisterPassword(e.target.value)}/>
                            {passwordError && <div className="error-message">{passwordError}</div>}
                            <button onClick={handleRegister}>Zarejestruj się</button>
                            <p>Masz już konto? <button onClick={() => {
                                setShowLogin(true)
                                setError(null);
                                setEmailError(null);
                                setPasswordError(null);
                            }}>Zaloguj się</button></p>
                        </>
                    )}
                    {registrationSuccess && (
                        <div className="success-message">
                            Rejestracja udana! Możesz się teraz zalogować.
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </div>
            )}
            <div className="main-content">
                <div className="image-container">
                    <img src={burger} alt="Opis obrazka" className="main-image"/>
                </div>
                <div className="text-container">
                    <p className="main-text">The best food: Go out to a restaurant or stay in and cook it yourself.</p>
                    <button className="find-meal-button" onClick={() => {
                        setModalVisibility(true);
                        setShowLogin(true);
                    }}>
                        Find your meal
                    </button>
                    <p className="sign-up-text" onClick={openRegister}>Sign Up Now</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
