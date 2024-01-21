import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';  // Import React Router Link
import {faBook} from '@fortawesome/free-solid-svg-icons';
import './homecook.css';

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
        <div className="home-container">
            <div className="header-container">
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