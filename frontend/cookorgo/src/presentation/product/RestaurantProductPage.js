import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getProductRestaurantDetails} from '../../api/api';
import {renderStarRating} from '../../ui/effects';
import './ProductPage.css';
import placeholder from "../../ui/placeholder.jpeg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import vegan from "../../ui/vegan.png";
import spicy from "../../ui/spicy.png";

function RestaurantProductPage() {
    const {categoryId, productId} = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProductRestaurantDetails(categoryId, productId);
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };

        fetchData();
    }, [categoryId, productId]);
    const handleAddToSummary = () => {
        const storedSummaryProducts = JSON.parse(localStorage.getItem('summaryProducts')) || [];
        storedSummaryProducts.push(productDetails);
        localStorage.setItem('summaryProducts', JSON.stringify(storedSummaryProducts));
        window.location.href = '/restaurants';
    };

    return (
        <div className="main-content-flex">
            <div className="product-page-container">
                {productDetails ? (
                    <>
                        <div className="product-image-pdp">
                            <img src={productDetails.imageURL || placeholder} onError={(e) => {
                                console.log('Error image');
                                e.target.src = placeholder;
                            }} alt="Product"/>
                        </div>
                        <div className="product-details">
                            <div className="product-name">{productDetails.name}
                                {productDetails.vegetarian &&
                                    <img src={vegan} alt="Vegan" style={{width: '20px', marginLeft: '5px'}}/>}
                                {productDetails.spicy &&
                                    <img src={spicy} alt="Spicy" style={{width: '20px', marginLeft: '5px'}}/>}
                            </div>
                            <div className="product-rating">
                                {renderStarRating(productDetails.rating)}
                            </div>
                            <div className="product-rating">{productDetails.description}</div>
                            <div className="product-price">{productDetails.price} {productDetails.currency}</div>
                            <p></p>
                            <div className="product-restaurant">{productDetails.restaurant.name}</div>
                            <div
                                className="product-adress">{productDetails.restaurant.address.city} {productDetails.restaurant.address.street} </div>
                        </div>

                    </>

                ) : (
                    <p>Loading...</p>
                )}
                <div className="add-to-cart-button" onClick={() => handleAddToSummary()}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>
            <Link to="/restaurants" className="back-button">Back</Link>
        </div>
    );
}

export default RestaurantProductPage;