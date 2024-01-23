import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getProductDetails} from '../../api/api';
import './ProductPage.css';
import placeholder from "../../ui/placeholder.jpeg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function ProductPage() {
    const {categoryId, productId} = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProductDetails(categoryId, productId);
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };

        fetchData();
    }, [categoryId, productId]);
    const handleAddToSummary  = () => {
        const storedSummaryProducts = JSON.parse(localStorage.getItem('summaryProducts')) || [];

        // Dodaj nowy produkt do listy
        storedSummaryProducts.push(productDetails);

        // Zapisz zaktualizowaną listę z powrotem do Local Storage
        localStorage.setItem('summaryProducts', JSON.stringify(storedSummaryProducts));
    };
    return (
        <div className="main-content-flex">
            <div className="product-page-container">
                {productDetails ? (
                    <>
                        <div className="product-image-pdp">
                            <img src={productDetails.imageURL || placeholder } onError={(e) => {
                                console.log('Error image');
                                e.target.src = placeholder;
                            }} alt="Product"/>
                            <div className="cooking-time">Cooking Time: {productDetails.cookingTime} minutes</div>
                        </div>
                        <div className="product-details">

                            <div className="ingredients">
                                <h3>Ingredients:</h3>
                                <p>{productDetails.ingredients}</p>
                            </div>
                            <div className="recipe">
                                <h3>Recipe:</h3>
                                <p>{productDetails.recipe}</p>
                            </div>
                        </div>

                    </>

                ) : (
                    <p>Loading...</p>
                )}
                <div className="add-to-cart-button" onClick={() => handleAddToSummary()}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>
            <Link to="/homeCook" className="back-button">Back</Link>
        </div>
    );
}

export default ProductPage;