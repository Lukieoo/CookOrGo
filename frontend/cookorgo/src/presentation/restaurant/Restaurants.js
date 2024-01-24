import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {faBook, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {fetchRestaurantCategories, fetchRestaurantProducts} from "../../api/api";
import placeholder from "../../ui/placeholder.jpeg";
import spicy from '../../ui/spicy.png';
import vegan from '../../ui/vegan.png';

function Restaurants() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [products, setProducts] = useState([]);
    const [summaryProducts, setSummaryProducts] = useState([]);

    useEffect(() => {
        const storedSummaryProducts = JSON.parse(localStorage.getItem('summaryProducts')) || [];
        setSummaryProducts(storedSummaryProducts);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('selectedProfileId')
        localStorage.removeItem('summaryProducts');
        window.location.href = "/";
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            const profileId = localStorage.getItem('selectedProfileId');

            if (profileId) {
                fetchRestaurantCategories(profileId, token)
                    .then(data => {
                        setCategories(data);
                        if (!selectedCategory && data.length > 0) {
                            setSelectedCategory(data[0].categoryRestaurantID);
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
        if (summaryProducts.length > 0) {
            localStorage.setItem('summaryProducts', JSON.stringify(summaryProducts));
        }
    }, [summaryProducts]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (selectedCategory !== null) {
            fetchRestaurantProducts(selectedCategory, token)
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
        localStorage.setItem('summaryProducts', JSON.stringify([]));
        setSummaryProducts([]);
    };
    const handleCategoryClick = (categoryId, name) => {
        setSelectedCategory(categoryId);
        setSelectedName(name);
    };
    const handleProductClick = (productId) => {
        window.location.href = `/restaurants/${selectedCategory}/${productId}`;
    };
    return (<div className="home-container">
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
                {Array.isArray(categories) && categories.map(category => (<div
                    key={category.categoryRestaurantID}
                    className={`category ${selectedCategory === category.categoryRestaurantID ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick(category.categoryRestaurantID, category.name)}>
                    {category.name}
                </div>))}
                <div className="summary-section">
                    <p className="name-section">Krótkie podsumowanie</p>
                    <div className="summary-products">
                        {summaryProducts.map((product, index) => (<div key={index} className="summary-product">
                            {product.name}
                        </div>))}
                    </div>
                    <Link to="/summaryAndMap" className="summary-link">
                    <button className="go-summary-button">
                        Przejdź do podsumowania
                    </button>
                </Link>
                    <button className="clear-summary-button" onClick={handleClearSummary}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </div>

            <div className="products-section-box">
                <p className="name-section">{selectedName}</p>
                <div className="products-section">
                    {products.map(product => (<div key={product.restaurantProductID} className="product-container">
                        <div className="product-image">
                            <img src={product.imageURL || {placeholder}} onError={(e) => {
                                console.log('Error image');
                                e.target.src = placeholder;
                            }} onClick={() => handleProductClick(product.restaurantProductID)} alt="Product"/>
                        </div>
                        <div className="product-details">
                            <div className="product-name">{product.name}
                                {product.vegetarian &&
                                    <img src={vegan} alt="Vegan" style={{width: '20px', marginLeft: '5px'}}/>}
                                {product.spicy &&
                                    <img src={spicy} alt="Spicy" style={{width: '20px', marginLeft: '5px'}}/>}
                            </div>
                            <div className="product-rating">Rating {product.rating}</div>
                            <div className="product-description">{product.description}</div>
                            <div className="product-price">{product.price} {product.currency}</div>
                            <div className="product-restaurant">{product.restaurant.name}</div>
                            <div
                                className="product-adress">{product.restaurant.address.city} {product.restaurant.address.street}</div>
                        </div>
                        <div className="add-to-cart-button" onClick={() => handleAddToSummary(product)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </div>
                    </div>))}
                </div>

            </div>

        </div>
    </div>);
}

export default Restaurants;