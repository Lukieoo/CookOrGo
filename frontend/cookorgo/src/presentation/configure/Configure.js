import React, {useState, useEffect} from 'react';
import {
    addProfile,
    deleteHomeFromProfile,
    deleteProfile,
    fetchCategories,
    fetchProfiles
} from "../../api/api";
import './configure.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faClose} from "@fortawesome/free-solid-svg-icons";

const ConfigureSite = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileId, setSelectedProfileId] = useState(null);

    const [categoriesHome, setCategoriesHome] = useState([]);
    const [selectedHomeCategoryId, setSelectedHomeCategoryId] = useState(null);

    const [isAddProfileFormVisible, setIsAddProfileFormVisible] = useState(false);
    const [newProfileData, setNewProfileData] = useState({
        profileName: '', email: '', address: {
            street: '', city: '', state: '', postalCode: '', country: '',
        },
    });
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            fetchProfiles(token)
                .then(data => {
                    setProfiles(data);
                })
                .catch(error => {
                    if (error.message === 'Unauthorized') {
                        console.error('Brak autoryzacji. Przekierowywanie na stronę startową...');
                        window.location.href = "/";
                    } else {
                        console.error('Błąd podczas pobierania profili:', error);
                    }
                });
        }
    }, []);

    const handleProfileChange = (event) => {
        const selectedId = parseInt(event.target.value);
        setSelectedProfileId(selectedId);
        setSelectedHomeCategoryId(null); // Reset selected category when profile changes
    };
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (selectedProfileId) {
            fetchCategories(selectedProfileId, token)
                .then(data => {
                    setCategoriesHome(data);
                })
                .catch(error => {
                    console.error('Błąd podczas pobierania kategorii:', error);
                });
        }
    }, [selectedProfileId]);
    const handleCategoryChange = (event) => {
        const selectedId = parseInt(event.target.value);
        setSelectedHomeCategoryId(selectedId);
    };
    const handleAddProfileClick = () => {
        setIsAddProfileFormVisible(true);
    };
    const handleFormInputChange = (event) => {
        const {name, value} = event.target;
        setNewProfileData(prevData => ({
            ...prevData, [name]: value,
        }));
    };

    const handleAddressInputChange = (event) => {
        const {name, value} = event.target;
        setNewProfileData(prevData => ({
            ...prevData, address: {
                ...prevData.address, [name]: value,
            },
        }));
    };

    const handleAddProfileSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            addProfile(token, newProfileData)
                .then(data => {
                    setProfiles(prevProfiles => [...prevProfiles, data]);
                    setNewProfileData({
                        profileName: '',
                        email: '',
                        address: {
                            street: '',
                            city: '',
                            state: '',
                            postalCode: '',
                            country: '',
                        },
                    });
                    setIsAddProfileFormVisible(false);
                })
                .catch(error => {
                    console.error('Błąd podczas dodawania profilu:', error.message);
                });
        }
    };
    const handleClose = (event) => {
        setIsAddProfileFormVisible(false);
    };
    const handleDeleteProfile = async () => {
        const token = localStorage.getItem('jwtToken');

        if (token && selectedProfileId) {
            await deleteProfile(token, selectedProfileId);

            const updatedProfiles = await fetchProfiles(token);
            setProfiles(updatedProfiles);

            setSelectedProfileId(null);
        }
    };
    const handleDeleteCategoryHome = async () => {
        const token = localStorage.getItem('jwtToken');

        if (token && selectedProfileId) {
            await deleteHomeFromProfile(token, selectedProfileId, selectedHomeCategoryId);

            const categories = await fetchCategories(selectedProfileId, token);
            setCategoriesHome(categories);

            setSelectedHomeCategoryId(null);
        }
    };
    return (<div>
        <h1>Konfiguracja Strony</h1>
        <label>Wybierz Profil:</label>
        <select value={selectedProfileId || ''} onChange={handleProfileChange}>
            <option value="">Wybierz profil...</option>
            {profiles.map(profile => (<option key={profile.id} value={profile.id}>
                {profile.profileName}
            </option>))}
        </select>

        <button onClick={handleAddProfileClick}>+</button>
        <div>
            {selectedProfileId && (
                <div>
                    <p>Wybrany profil: {selectedProfileId}
                        <button onClick={handleDeleteProfile}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </p>
                </div>
            )}
        </div>
        {isAddProfileFormVisible && (<form onSubmit={handleAddProfileSubmit}>
            {/* Formularz do dodawania nowego profilu */}
            <label>Nazwa Profilu:</label>
            <input
                type="text"
                name="profileName"
                placeholder="Nazwa Profilu"
                value={newProfileData.profileName}
                onChange={handleFormInputChange}
            />

            <label>Email:</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newProfileData.email}
                onChange={handleFormInputChange}
            />

            <label>Adres:</label>
            <input
                type="text"
                name="city"
                placeholder="Miasto"
                value={newProfileData.address.city}
                onChange={handleAddressInputChange}
            />
            <input
                type="text"
                name="street"
                placeholder="Ulica i numer domu"
                value={newProfileData.address.street}
                onChange={handleAddressInputChange}
            />
            {/* Dodaj pozostałe pola adresu */}

            <button type="submit">Dodaj Profil</button>
            <button onClick={handleClose}>
                <FontAwesomeIcon icon={faClose}/>
            </button>
        </form>)}


        <label>Wybierz Kategorię Home:</label>
        <select value={selectedHomeCategoryId || ''} onChange={handleCategoryChange}>
            <option value="">Wybierz kategorię...</option>
            {categoriesHome.map(category => (
                <option key={category.categoryHomeID} value={category.categoryHomeID}>
                    {category.name}
                </option>
            ))}
        </select>
        <div>
            {selectedHomeCategoryId && (
                <div>
                    <p>Wybrana kategoria : {selectedHomeCategoryId}
                        <button onClick={handleDeleteCategoryHome}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </p>
                </div>
            )}
        </div>
        <Link to="/dashboard" className="back-button">Back</Link>
    </div>);
};

export default ConfigureSite;