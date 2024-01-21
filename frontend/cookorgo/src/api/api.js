const API_URL = 'http://localhost:8080';

export const fetchProfiles = async (jwtToken) => {
    try {
        const response = await fetch(`${API_URL}/user/my-profiles`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            // Obsłuż błędy zapytania
            console.error('Błąd pobierania profili');
            return null;
        }
    } catch (error) {
        console.error('Błąd sieci:', error);
        return null;
    }
};
export const fetchCategories = async (profileId) => {
    try {
        const response = await fetch(`${API_URL}/profiles/${profileId}/home`);
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
export const fetchProducts = async (categoryId) => {
    try {
        const response = await fetch(`${API_URL}/home/${categoryId}/products`);
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};