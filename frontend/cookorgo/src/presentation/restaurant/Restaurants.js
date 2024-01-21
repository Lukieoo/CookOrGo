import React, {useEffect} from 'react';
import logo from "../../ui/logo.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';  // Import React Router Link
import {faBook} from '@fortawesome/free-solid-svg-icons';

function HomeCook() {
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
                    <Link to="/dashboard" className="dashboard-link">
                        <FontAwesomeIcon icon={faBook}/>
                    </Link>
                    <button className="login-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>

            </div>
        </div>
    );
}

export default HomeCook;