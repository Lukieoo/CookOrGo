import React, {useState} from 'react';
import {addProductsToRestaurant} from "../../api/api";

const ProductModal = ({products, selectedCategory, onClose}) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        currency: 'PLN',
        vegetarian: false,
        spicy: false,
        rating: 0,
        imageURL: '',
        restaurant: {
            name: '',
            logoURL: '',
            address: {
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
            },
        },
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };
    const handleInputChangeCheckbox = (event, field) => {
        const isChecked = event.target.checked;
        setNewProduct((prevData) => ({
            ...prevData,
            [field]: isChecked,
        }));
    };
    const handleAddressInputChange = (event) => {
        const {name, value} = event.target;

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            restaurant: {
                ...prevProduct.restaurant,
                address: {
                    ...prevProduct.restaurant.address,
                    [name]: value,
                },
            },
        }));
    };
    const handleInputChangeRestaurant = (event, field) => {
        const {value} = event.target;
        setNewProduct((prevData) => ({
            ...prevData,
            restaurant: {
                ...prevData.restaurant,
                [field]: value,
            },
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            window.location.href = "/";
        } else {
            addProductsToRestaurant(token, selectedCategory, newProduct)
                .then(data => {
                    setNewProduct(prevProfiles => [...prevProfiles, data]);
                    setNewProduct({
                        profileName: '', email: '', address: {
                            street: '', city: '', state: '', postalCode: '', country: '',
                        },
                    });
                    console.log('Nowy produkt:', newProduct);
                    onClose()
                })
                .catch(error => {
                    console.error('Błąd podczas dodawania produktu:', error.message);
                });
        }

    };

    return (
        <div className="product-modal">
            <h2>Lista Produktów</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>

            <h2>Dodaj nowy produkt</h2>
            <form onSubmit={handleSubmit} className="product-form">

                <label className="form-label">
                    Nazwa:
                    <input type="text" name="name" value={newProduct.name} onChange={handleInputChange}
                           className="form-input"/>
                </label>

                <label className="form-label">
                    Opis:
                    <textarea name="description" value={newProduct.description} onChange={handleInputChange}
                              className="form-input"/>
                </label>

                <label className="form-label">
                    Cena:
                    <input type="number" name="price" value={newProduct.price} onChange={handleInputChange}
                           className="form-input"/>
                </label>

                <label className="form-label">
                    Waluta:
                    <input type="text" name="currency" value={newProduct.currency} onChange={handleInputChange}
                           className="form-input"/>
                </label>

                <label className="form-label">
                    Wegetariańskie:
                    <input
                        type="checkbox"
                        name="vegetarian"
                        checked={newProduct.vegetarian}
                        onChange={(e) => handleInputChangeCheckbox(e, 'vegetarian')}
                        className="form-checkbox"
                    />
                </label>

                <label className="form-label">
                    Pikantne:
                    <input
                        type="checkbox"
                        name="spicy"
                        checked={newProduct.spicy}
                        onChange={(e) => handleInputChangeCheckbox(e, 'spicy')}
                        className="form-checkbox"
                    />
                </label>

                <label className="form-label">
                    Ocena:
                    <input type="number" name="rating" value={newProduct.rating} onChange={handleInputChange}
                           className="form-input"/>
                </label>

                <label className="form-label">
                    URL obrazu:
                    <input type="text" name="imageURL" value={newProduct.imageURL} onChange={handleInputChange}
                           className="form-input"/>
                </label>

                <h3 className="form-subheader">Dane restauracji:</h3>

                <label className="form-label">
                    Nazwa restauracji:
                    <input
                        type="text"
                        name="restaurantName"
                        value={newProduct.restaurant.name}
                        onChange={(e) => handleInputChangeRestaurant(e, 'name')}
                        className="form-input"
                    />
                </label>

                <label className="form-label">
                    Logo restauracji:
                    <input
                        type="text"
                        name="restaurantLogoURL"
                        value={newProduct.restaurant.logoURL}
                        onChange={(e) => handleInputChangeRestaurant(e, 'logoURL')}
                        className="form-input"
                    />
                </label>

                <label className="form-label">
                    Ulica:
                    <input
                        type="text"
                        name="street"
                        value={newProduct.restaurant.address.street}
                        onChange={(e) => handleAddressInputChange(e, 'street')}
                        className="form-input"
                    />
                </label>

                <label className="form-label">
                    Miasto:
                    <input
                        type="text"
                        name="city"
                        value={newProduct.restaurant.address.city}
                        onChange={(e) => handleAddressInputChange(e, 'city')}
                        className="form-input"
                    />
                </label>

                <label className="form-label">
                    Stan:
                    <input
                        type="text"
                        name="state"
                        value={newProduct.restaurant.address.state}
                        onChange={(e) => handleAddressInputChange(e, 'state')}
                        className="form-input"
                    />
                </label>

                <label className="form-label">
                    Kod pocztowy:
                    <input
                        type="text"
                        name="postalCode"
                        value={newProduct.restaurant.address.postalCode}
                        onChange={(e) => handleAddressInputChange(e, 'postalCode')}
                        className="form-input"
                    />
                </label>

                <label className="form-label">
                    Kraj:
                    <input
                        type="text"
                        name="country"
                        value={newProduct.restaurant.address.country}
                        onChange={(e) => handleAddressInputChange(e, 'country')}
                        className="form-input"
                    />
                </label>

                <button type="submit" className="form-button">Dodaj produkt</button>

            </form>

            <button onClick={onClose}>Zamknij</button>
        </div>
    );
};

export default ProductModal;