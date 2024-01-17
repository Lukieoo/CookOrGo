import React, {useEffect} from 'react';
import './Dashboard.css';
import logo from "../../ui/logo.png";
import option_restaurant from "../../ui/option_restaurant.png";
import option_home from "../../ui/option_home.png";

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

            <h1 style={{color: 'white', marginTop: '20px'}}>What you want to do today?</h1>

            <div className="square" onClick={() => {
                window.location.href = "/restaurants";
            }}>
                <img src={option_restaurant} alt="Image 1"/>
                <div className="text">Go to Restaurant</div>
            </div>
            <div className="square" onClick={() => {
                window.location.href = "/homeCook";
            }}>
                <img src={option_home} alt="Image 2"/>
                <div className="text">Cook at Home</div>
            </div>

        </div>
    );
}

export default Dashboard;