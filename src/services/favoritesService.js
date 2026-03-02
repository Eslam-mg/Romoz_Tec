import { apiGet, BASE_URL } from "./api";

/**
* Bring your favorites
*/
export async function fetchFavorites(token) {
    return apiGet("/favorites", token);
}

/**
* Add an ad from favorites
*/
export async function toggleFavorite(category, adId, token) {
    const response = await fetch(`${BASE_URL}/favorites/${category}/${adId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

/**
* remove an ad from favorites
*/
export async function toggleFavorite(category, adId, token) {
    const response = await fetch(`${BASE_URL}/favorites/${category}/${adId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}
