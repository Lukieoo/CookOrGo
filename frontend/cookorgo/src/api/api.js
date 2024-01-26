const API_URL = 'http://localhost:8080';

export const fetchProfiles = async (jwtToken, throwErrorOn401 = false) => {

    const response = await fetch(`${API_URL}/user/my-profiles`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 401) {
        throw new Error('Unauthorized');
    } else {
        console.error('Błąd pobierania profili ');
        return [];
    }

};

export const fetchCategories = async (profileId, jwtToken) => {

    const response = await fetch(`${API_URL}/profiles/${profileId}/home`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data || [];
    } else if (response.status === 401) {
        throw new Error('Unauthorized');
    } else {
        console.error('Error fetching categories:');
        return [];
    }

};
export const fetchProducts = async (categoryId, jwtToken) => {
    try {
        const response = await fetch(`${API_URL}/home/${categoryId}/products`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const fetchRestaurantCategories = async (profileId, jwtToken) => {

    const response = await fetch(`${API_URL}/profiles/${profileId}/restaurant`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data || [];
    } else if (response.status === 401) {
        throw new Error('Unauthorized');
    } else {
        console.error('Error fetching categories:');
        return [];
    }

};
export const fetchRestaurantProducts = async (categoryId, jwtToken) => {
    try {
        const response = await fetch(`${API_URL}/restaurant/${categoryId}/products`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        return [];
    }
};

export const getProductDetails = async (categoryId, productId) => {
    const response = await fetch(`${API_URL}/home/${categoryId}/products/${productId}`);
    const data = await response.json();
    return data;
};
export const getProductRestaurantDetails = async (categoryId, productId) => {
    const response = await fetch(`${API_URL}/restaurant/${categoryId}/products/${productId}`);
    const data = await response.json();
    return data;
};
const headers = (token) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

const handleResponse = async (response) => {
    if (response.ok) {
        if (response.status === 204) {
            return null;
        } else {
            return response.json();
        }
    } else {
        const error = await response.json();
        throw new Error(error.message || 'Wystąpił błąd.');
    }
};

export const addProfile = async (token, profileData) => {
    const url = `${[API_URL]}/user/add-profile`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            profileName: profileData.profileName,
            email: profileData.email,
            address: {
                street: profileData.address.street,
                city: profileData.address.city,
                state: profileData.address.state,
                postalCode: profileData.address.postalCode,
                country: profileData.address.country,
            },
        }),
    });

    return handleResponse(response);
};
export const addRestaurantToProfile = async (token, profileID, restaurantData) => {
    const url = `${API_URL}/profiles/${profileID}/restaurant`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurantData),
    });

    return handleResponse(response);
};
export const addProductsToRestaurant = async (token, restaurantID, productData) => {
    const url = `${API_URL}/restaurant/${restaurantID}/products`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });

    return handleResponse(response);
};
export const addHomeToProfile = async (token, profileID, restaurantData) => {
    const url = `${API_URL}/profiles/${profileID}/home`;

    const response = await fetch(url, {
        method: 'POST',
        headers: headers(token),
        body: JSON.stringify(restaurantData),
    });

    return handleResponse(response);
};
export const deleteRestaurantFromProfile = async (token, profileID, restaurantID) => {

    const url = `${API_URL}/profiles/${profileID}/restaurant/${restaurantID}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(response);
};
export const deleteHomeFromProfile = async (token, profileID, homeID) => {

    const url = `${API_URL}/profiles/${profileID}/home/${homeID}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(response);
};
export const deleteProfile = async (token, profileID) => {

    const url = `${API_URL}/profiles/${profileID}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(response);
};