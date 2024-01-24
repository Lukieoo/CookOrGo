import React, {useState, useEffect, useRef} from 'react';
import './SummaryPage.css';
import {Link} from "react-router-dom";

import { useReactToPrint } from 'react-to-print';

function SummaryPage() {
    const [summaryProducts, setSummaryProducts] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        // Pobierz listę produktów z Local Storage podczas ładowania komponentu
        const storedSummaryProducts = JSON.parse(localStorage.getItem('summaryProducts')) || [];
        setSummaryProducts(storedSummaryProducts);
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="summary-page-container">
            <h2>Podsumowanie</h2>
            {summaryProducts.length > 0 ? (
                <div className="summary-products-sum" ref={componentRef}>
                    {summaryProducts.map((product, index) => (
                        <div key={index} className="summary-product">
                            <p>{product.recipe}</p>
                            {/* Dodaj inne informacje o produkcie, jeśli są dostępne */}
                            {product.ingredients && <p>Potrzebne składniki: {product.ingredients}</p>}
                            {product.cookingTime && <p>Czas przygotowania: {product.cookingTime} minut</p>}
                            {product.recipe && <p>Potrzebne: {product.cookingTime} minut</p>}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Brak produktów w koszyku.</p>
            )}

            <Link to="/homeCook" className="back-button">Back</Link>
            <button className="generate-pdf-button" onClick={handlePrint}>
                Wydrukuj lub zapisz do pdf
            </button>
        </div>
    );
}

export default SummaryPage;