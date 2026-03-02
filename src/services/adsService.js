import { apiGet, apiPostForm, BASE_URL } from "./api";

/**
* Fetching ads by category 
*/
export async function fetchAdsByCategory(category, perPage = 20) {
    return apiGet(`/ealans?category=${category}&per_page=${perPage}`);
}

/**
* Retrieving details of a specific advertisement
*/
export async function fetchAdDetails(category, id) {
    return apiGet(`/ealans/${category}/${id}`);
}

/**
* Send a new ad
*/
export async function submitAd(formData, token) {
    return apiPostForm("/ealans", formData, token);
}

/**
* Retrieves ads for the current user
*/
export async function fetchUserAds(token) {
    return apiGet("/profile/ealans", token);
}

/**
* Building a link to the full image
*/
export function getImageUrl(path) {
    if (!path) return null;
    return `${BASE_URL.replace("/api", "/storage")}/${path}`;
}
