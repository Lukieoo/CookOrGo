import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';  // Import React Router Link
import {faBook, faPlus} from '@fortawesome/free-solid-svg-icons';
import {fetchCategories, fetchProducts} from '../../api/api';
import placeholder from "../../ui/placeholder.jpeg";
import './homecook.css';

function HomeCook() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [products, setProducts] = useState([]);
    const [summaryProducts, setSummaryProducts] = useState([]); // New state for summary products

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
            const profileId = localStorage.getItem('selectedProfileId');

            if (profileId) {
                fetchCategories(profileId, token)
                    .then(data => {
                        setCategories(data);
                        if (!selectedCategory && data.length > 0) {
                            setSelectedCategory(data[0].categoryHomeID);
                            setSelectedName(data[0].name);
                        }
                    })
                    .catch((error) => {
                        if (error.message === 'Unauthorized') {
                            handleLogout()
                        } else {
                            console.error('Inny błąd:', error.message);
                        }
                    });
            }
        }
    }, [selectedCategory]);
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (selectedCategory !== null) {
            fetchProducts(selectedCategory, token)
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
    }, [selectedCategory]);
    const handleAddToSummary = (product) => {
        setSummaryProducts([...summaryProducts, product]);
    };
    const handleClearSummary = () => {
        setSummaryProducts([]);
    };
    const handleCategoryClick = (categoryId, name) => {
        setSelectedCategory(categoryId);
        setSelectedName(name);
    };
    return (
        <div className="home-container">
            <div className="header-container-box">
                <div className="login-container-box">
                    <Link to="/dashboard" className="dashboard-link">
                        <FontAwesomeIcon icon={faBook}/>
                    </Link>
                    <button className="login-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>

            </div>
            <div className="home-main">
                <div className="categories-section">
                    <p className="name-section">Kategorie</p>
                    {Array.isArray(categories) && categories.map(category => (
                        <div
                            key={category.categoryHomeID}
                            className={`category ${selectedCategory === category.categoryHomeID ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category.categoryHomeID, category.name)}>
                            {category.name}
                        </div>
                    ))}
                    <div className="summary-section">
                        <p className="name-section">Krótkie podsumowanie</p>
                        <div className="summary-products">
                            {summaryProducts.map((product, index) => (
                                <div key={index} className="summary-product">
                                    {product.recipe}
                                </div>
                            ))}
                        </div>
                        <button className="go-summary-button">
                            Przejdź do podsumowania
                        </button>
                        <button className="clear-summary-button" onClick={handleClearSummary}>
                            Wyczyść podsumowanie
                        </button>
                    </div>
                </div>

                <div className="products-section-box">
                    <p className="name-section">{selectedName}</p>
                    <div className="products-section">
                        {products.map(product => (
                            <div key={product.homeProductID} className="product-container">
                                <div className="product-image">
                                    <img src={product.imageURL || {placeholder}} onError={(e) => {
                                        console.log('Error image');
                                        e.target.src = placeholder;
                                    }} alt="Product"/>
                                </div>
                                <div className="product-details">
                                    <div className="product-name">{product.recipe}</div>
                                    <div className="product-rating">{product.rating}</div>
                                </div>
                                <div className="add-to-cart-button" onClick={() => handleAddToSummary(product)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default HomeCook;