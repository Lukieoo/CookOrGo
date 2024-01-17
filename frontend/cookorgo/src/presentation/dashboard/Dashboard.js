import React, {useEffect} from 'react';
import './Dashboard.css';
import logo from "../../ui/logo.png";

function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');

        window.location.href = "/";
    };
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        }
    }, []);
    return (
        <div className="dashboard-container">
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo firmy" className="logo"/>
                </div>
                <div className="login-container">
                    <button className="login-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;