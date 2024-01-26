import React, {useState, useEffect} from 'react';
import {
    addHomeToProfile,
    addProfile,
    addRestaurantToProfile,
    deleteHomeFromProfile,
    deleteProfile,
    deleteRestaurantFromProfile,
    fetchCategories,
    fetchProfiles,
    fetchRestaurantCategories, fetchRestaurantProducts, getProductRestaurantDetails
} from "../../api/api";
import './configure.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faClose, faCocktail} from "@fortawesome/free-solid-svg-icons";
import ProductModal from "./ProductModal";

const ConfigureSite = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileId, setSelectedProfileId] = useState(null);

    const [categoriesHome, setCategoriesHome] = useState([]);
    const [selectedHomeCategoryId, setSelectedHomeCategoryId] = useState(null);

    const [categoriesRestaurant, setCategoriesRestaurant] = useState([]);
    const [selectedRestaurantCategoryId, setSelectedRestaurantCategoryId] = useState(null);

    const [isAddProfileFormVisible, setIsAddProfileFormVisible] = useState(false);
    const [isAddCategoryHomeFormVisible, setIsAddCategoryHomeFormVisible] = useState(false);
    const [isAddCategoryRestaurantFormVisible, setIsAddCategoryRestaurantFormVisible] = useState(false);

    const [newProfileData, setNewProfileData] = useState({
        profileName: '', email: '', address: {
            street: '', city: '', state: '', postalCode: '', country: '',
        },
    });
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('selectedProfileId')
        window.location.href = "/";
    };
    const [newCategoryHomeData, setNewCategoryHomeData] = useState({
        name: '',
    });
    const [newCategoryRestaurantData, setNewCategoryRestaurantData] = useState({
        name: '',
    });
    //Modal
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const [products, setProducts] = useState([]);

    const handleAddProduct = async () => {
        const token = localStorage.getItem('jwtToken');
        if (selectedRestaurantCategoryId !== null) {
            fetchRestaurantProducts(selectedRestaurantCategoryId, token)
                .then(data => {
                    setProducts(data);
                })
                .catch(error => {
                    if (error.message === 'Unauthorized') {
                        handleLogout()
                    } else {
                        console.error('Inny błąd:', error.message);
                    }
                });
        }

        setIsProductModalVisible(true);
    };

    const handleCloseProductModal = () => {
        setIsProductModalVisible(false);
    };
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
        setSelectedHomeCategoryId(null);
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
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (selectedProfileId) {
            fetchRestaurantCategories(selectedProfileId, token)
                .then(data => {
                    setCategoriesRestaurant(data);
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
    const handleCategoryRestaurantChange = (event) => {
        const selectedId = parseInt(event.target.value);
        setSelectedRestaurantCategoryId(selectedId);
    };
    const handleAddProfileClick = () => {
        setIsAddProfileFormVisible(true);
    };
    const handleAddCategoryClick = () => {
        setIsAddCategoryHomeFormVisible(true);
    };
    const handleAddCategoryRestaurantClick = () => {
        setIsAddCategoryRestaurantFormVisible(true);
    };
    const handleFormInputChange = (event) => {
        const {name, value} = event.target;
        setNewProfileData(prevData => ({
            ...prevData, [name]: value,
        }));
    };

    const handleCategoryFormInputChange = (event) => {
        const {name, value} = event.target;
        setNewCategoryHomeData(prevData => ({
            ...prevData, [name]: value,
        }));
    };
    const handleCategoryRestaurantFormInputChange = (event) => {
        const {name, value} = event.target;
        setNewCategoryRestaurantData(prevData => ({
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
                        profileName: '', email: '', address: {
                            street: '', city: '', state: '', postalCode: '', country: '',
                        },
                    });
                    setIsAddProfileFormVisible(false);
                })
                .catch(error => {
                    console.error('Błąd podczas dodawania profilu:', error.message);
                });
        }
    };
    const handleAddCategoryHomeSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            addHomeToProfile(token, selectedProfileId, newCategoryHomeData)
                .then(data => {
                    setCategoriesHome(prevCategoriesHome => [...prevCategoriesHome, data]);
                    setNewCategoryHomeData({
                        name: '',
                    });
                    setIsAddCategoryHomeFormVisible(false);
                })
                .catch(error => {
                    console.error('Błąd podczas dodawania kategorii:', error.message);
                });
        }
    };
    const handleAddCategoryRestaurantSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            addRestaurantToProfile(token, selectedProfileId, newCategoryRestaurantData)
                .then(data => {
                    setCategoriesRestaurant(prevCategoriesRestaurant => [...prevCategoriesRestaurant, data]);
                    setNewCategoryRestaurantData({
                        name: '',
                    });
                    setIsAddCategoryRestaurantFormVisible(false);
                })
                .catch(error => {
                    console.error('Błąd podczas dodawania kategorii:', error.message);
                });
        }
    };
    const handleClose = (event) => {
        setIsAddProfileFormVisible(false);
    };
    const handleHomeClose = (event) => {
        setIsAddCategoryHomeFormVisible(false);
    };
    const handleRestaurantClose = (event) => {
        setIsAddCategoryRestaurantFormVisible(false);
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

    const handleDeleteCategoryRestaurant = async () => {
        const token = localStorage.getItem('jwtToken');

        if (token && selectedProfileId) {
            await deleteRestaurantFromProfile(token, selectedProfileId, selectedRestaurantCategoryId);

            const categories = await fetchRestaurantCategories(selectedProfileId, token);
            setCategoriesRestaurant(categories);

            setSelectedRestaurantCategoryId(null);
        }
    };
    return (<div className="configure-site-container">
        <h1>Konfiguracja Strony</h1>

        <label className="config-label">Wybierz Profil:</label>
        <select
            value={selectedProfileId || ''}
            onChange={handleProfileChange}
            className="config-select"
        >
            <option value="">Wybierz profil...</option>
            {profiles.map(profile => (<option key={profile.id} value={profile.id}>
                {profile.profileName}
            </option>))}
        </select>

        <button
            onClick={handleAddProfileClick}
            className="config-button"
        >
            Nowy Profil +
        </button>

        <div className="selection-section">
            {selectedProfileId && (<div>
                <p className="selected-profile">
                    Wybrany profil: {selectedProfileId}
                    <button
                        onClick={handleDeleteProfile}
                        className="config-button-delete"
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </p>
            </div>)}
        </div>

        {isAddProfileFormVisible && (<form onSubmit={handleAddProfileSubmit} className="add-profile-form">
            {/* Formularz do dodawania nowego profilu */}
            <label className="config-label">Nazwa Profilu:</label>
            <input
                type="text"
                name="profileName"
                placeholder="Nazwa Profilu"
                value={newProfileData.profileName}
                onChange={handleFormInputChange}
                className="config-input"
            />

            <label className="config-label">Email:</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newProfileData.email}
                onChange={handleFormInputChange}
                className="config-input"
            />

            <label className="config-label">Adres:</label>
            <input
                type="text"
                name="city"
                placeholder="Miasto"
                value={newProfileData.address.city}
                onChange={handleAddressInputChange}
                className="config-input"
            />
            <input
                type="text"
                name="street"
                placeholder="Ulica i numer domu"
                value={newProfileData.address.street}
                onChange={handleAddressInputChange}
                className="config-input"
            />

            <button type="submit" className="config-button-submit">Dodaj Profil</button>
            <button onClick={handleClose} className="config-button-close">
                <FontAwesomeIcon icon={faClose}/>
            </button>
        </form>)}
        <h1>-</h1>
        <label className="config-label">Wybierz Kategorię Home:</label>
        <select
            value={selectedHomeCategoryId || ''}
            onChange={handleCategoryChange}
            className="config-select"
        >
            <option value="">Wybierz kategorię...</option>
            {categoriesHome.map(category => (<option key={category.categoryHomeID} value={category.categoryHomeID}>
                {category.name}
            </option>))}
        </select>
        <button
            onClick={handleAddCategoryClick}
            className="config-button"
        >
            Nowa Kategoria +
        </button>
        <div className="selection-section">
            {selectedHomeCategoryId && (<div>
                <p className="selected-category">
                    Wybrana kategoria : {selectedHomeCategoryId}
                    <button
                        onClick={handleDeleteCategoryHome}
                        className="config-button-delete">
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </p>

            </div>)}
        </div>
        {isAddCategoryHomeFormVisible && (<form onSubmit={handleAddCategoryHomeSubmit} className="add-profile-form">
            <label className="config-label">Nazwa Kategorii:</label>
            <input
                type="text"
                name="name"
                placeholder="Nazwa Kategorii"
                value={newCategoryHomeData.name}
                onChange={handleCategoryFormInputChange}
                className="config-input"
            />
            <button type="submit" className="config-button-submit">Dodaj Kategorię</button>
            <button onClick={handleHomeClose} className="config-button-close">
                <FontAwesomeIcon icon={faClose}/>
            </button>
        </form>)}
        <br/>
        <h1>-</h1>
        <label className="config-label">Wybierz Kategorię Restaurant:</label>
        <select
            value={selectedRestaurantCategoryId || ''}
            onChange={handleCategoryRestaurantChange}
            className="config-select"
        >
            <option value="">Wybierz kategorię...</option>
            {categoriesRestaurant.map(category => (
                <option key={category.categoryRestaurantID} value={category.categoryRestaurantID}>
                    {category.name}
                </option>))}
        </select>
        <button
            onClick={handleAddCategoryRestaurantClick}
            className="config-button"
        >
            Nowa Kategoria +
        </button>

        <div className="selection-section">
            {selectedRestaurantCategoryId && (<div>
                <p className="selected-category">
                    Wybrana kategoria : {selectedRestaurantCategoryId}
                    <button
                        onClick={handleDeleteCategoryRestaurant}
                        className="config-button-delete">
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    <button onClick={handleAddProduct} className="config-button">
                        <FontAwesomeIcon icon={faCocktail}/>
                    </button>
                </p>
            </div>)}
        </div>
        {isProductModalVisible && (
            <ProductModal products={products} selectedCategory={selectedRestaurantCategoryId}
                          onClose={handleCloseProductModal}/>
        )}
        {isAddCategoryRestaurantFormVisible && (
            <form onSubmit={handleAddCategoryRestaurantSubmit} className="add-profile-form">
                <label className="config-label">Nazwa Kategorii:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nazwa Kategorii"
                    value={newCategoryRestaurantData.name}
                    onChange={handleCategoryRestaurantFormInputChange}
                    className="config-input"
                />
                <button type="submit" className="config-button-submit">Dodaj Kategorię</button>
                <button onClick={handleRestaurantClose} className="config-button-close">
                    <FontAwesomeIcon icon={faClose}/>
                </button>
            </form>)}

        <Link to="/dashboard" className="back-button">Back</Link>
    </div>);


};

export default ConfigureSite;