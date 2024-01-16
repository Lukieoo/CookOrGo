import React, { useState } from 'react';
import burger from './burger.png';
import logo from './logo.png';
import './App.css';
import { login } from './AuthService';
function App() {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [username, setUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const closeModal = () => {
        setModalVisibility(false);
        // Resetowanie stanów pól po zamknięciu modala
        setEmail('');
        setPassword('');
        setRegisterEmail('');
        setUsername('');
        setRegisterPassword('');
    };

    const handleLogin = async () => {
        const token = await login(email, password);

        if (token) {
            // Tutaj możesz dodać logikę po poprawnym zalogowaniu, np. przekierowanie do innej strony
            console.log('Przekieruj gdzieś po poprawnym zalogowaniu.');
            closeModal();
        }
    };


    const handleRegister = () => {
        // Logika dla przycisku Zarejestruj się
        // Tutaj możesz dodać kod rejestracji
        console.log('Rejestracja:', registerEmail, username, registerPassword);
        closeModal();
    };

    return (
        <div className="app-container">
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo firmy" className="logo" />
                </div>
                <div className="login-container">
                    <button className="login-button" onClick={() => { setModalVisibility(true); setShowLogin(true); }}>
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
                            <label>Email:</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>Zaloguj</button>
                            <p>Nie masz konta? <button onClick={() => setShowLogin(false)}>Zarejestruj się</button></p>
                        </>
                    ) : (
                        <>
                            <h2>Register</h2>
                            <label>Email:</label>
                            <input type="text" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Password:</label>
                            <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                            <button onClick={handleRegister}>Zarejestruj się</button>
                            <p>Masz już konto? <button onClick={() => setShowLogin(true)}>Zaloguj się</button></p>
                        </>
                    )}
                </div>
            )}
            <div className="main-content">
                <div className="image-container">
                    <img src={burger} alt="Opis obrazka" className="main-image" />
                </div>
                <div className="text-container">
                    <p className="main-text">The best food: Go out to a restaurant or stay in and cook it yourself.</p>
                    <button className="find-meal-button">Find your meal</button>
                    <p className="sign-up-text">Sign Up Now</p>
                </div>
            </div>
        </div>
    );
}

export default App;
