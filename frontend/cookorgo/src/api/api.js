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
        // Obsłuż status 401 jako błąd
        throw new Error('Unauthorized');
    } else {
        // Obsłuż inne błędy zapytania
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