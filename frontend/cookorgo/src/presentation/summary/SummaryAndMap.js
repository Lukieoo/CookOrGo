import React, {useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import './SummaryWithMap.css';  // Zmiana nazwy pliku CSS
import MapComponent from '../../ui/MapComponent';
import {Link} from "react-router-dom";

const SummaryAndMap = () => {
    const [summaryProducts, setSummaryProducts] = useState([]);

    useEffect(() => {
        const storedSummaryProducts = JSON.parse(localStorage.getItem('summaryProducts')) || [];
        setSummaryProducts(storedSummaryProducts);
    }, []);

    const calculateTotalPrice = () => {
        return summaryProducts.reduce((total, product) => total + product.price, 0);
    };
    return (
        <div className="summary-page-container">
            <h2>Podsumowanie</h2>
            {summaryProducts.length > 0 ? (
                <div className="summary-products-sum" >
                    {summaryProducts.map((product, index) => (
                        <div key={index} className="summary-product">
                            <p><b>{product.name} </b> {product.price} {product.currency}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Brak produktów w koszyku.</p>
            )}
            <div className="total-price-section">
                <p className="total-price">Suma cen: {calculateTotalPrice().toFixed(2)} PLN</p>
            </div>
            <Link to="/restaurants" className="back-button">Back</Link>
            <div className="summary-and-map-container">
            <div className="map-section">
                <h1 className="map-heading">Mapa restauracji</h1>
                <MapComponent  restaurants={summaryProducts}/>
            </div>

            {summaryProducts.length > 0 ? (
                <div className="summary-restaurant-sum" >
                    <h1 className="map-heading">Restauracje</h1>
                    {summaryProducts.map((product, index) => (
                            <p><b>{product.restaurant.name} </b> {product.restaurant.address.city} {product.restaurant.address.street} {product.restaurant.address.postalCode}</p>
                    ))}
                </div>
            ) : (
                <p>Brak restauracji.</p>
            )}
            </div>
        </div>
    );
};

export default SummaryAndMap;