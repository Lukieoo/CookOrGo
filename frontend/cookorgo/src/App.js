import logo from './logo.png';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <div className="logo-container">
                <img src={logo} alt="Logo firmy" className="logo"/>
            </div>
            <div className="login-container">
                <button className="login-button">Zaloguj</button>
            </div>
        </div>
    );
}

export default App;
