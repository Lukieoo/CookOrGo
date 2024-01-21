import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import logo from "../../ui/logo.png";
import option_restaurant from "../../ui/option_restaurant.png";
import option_home from "../../ui/option_home.png";
import {fetchProfiles} from '../../api/api';

function Dashboard() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('selectedProfileId')
        window.location.href = "/";
    };
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            fetchProfiles(token)
                .then((data) => {
                    // Zrób coś z danymi profili (np. ustaw w stanie)
                    console.log('Profiles:', data);
                    setProfiles(data);

                    // Sprawdź, czy masz już zapisany wybrany profil w localStorage
                    const storedProfileId = localStorage.getItem('selectedProfileId');
                    const storedProfile = data.find(profile => profile.id.toString() === storedProfileId);

                    // Jeśli masz zapisany profil, ustaw go jako aktualnie wybrany
                    if (storedProfile) {
                        setSelectedProfile(storedProfile);
                    } else if (data.length > 0) {
                        // Jeśli nie masz zapisanego profilu, a są dostępne profile, ustaw pierwszy jako domyślny
                        setSelectedProfile(data[0]);
                    }
                });
        }
    }, []);
    const handleProfileClick = (profile) => {
        // Ustaw wybrany profil w stanie i zapisz w localStorage
        setSelectedProfile(profile);
        localStorage.setItem('selectedProfileId', profile.id.toString());
    };


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
            <h1 style={{color: 'white', marginTop: '20px'}}>Profiles</h1>
            <div className="profile-section">
                {profiles.map((profile) => (
                    <div
                        key={profile.id}
                        className={`profile-rectangle ${selectedProfile && selectedProfile.id === profile.id ? 'selected' : ''}`}
                        onClick={() => handleProfileClick(profile)}
                    >
                        <div className="profile-name">{profile.profileName}</div>
                    </div>
                ))}
            </div>

        </div>

    );
}

export default Dashboard;