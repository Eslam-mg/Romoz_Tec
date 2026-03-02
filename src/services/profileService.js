import { apiGet, apiPostForm, BASE_URL } from "./api";

/**
* Retrieve ads for the current user (User Offers)
*/
export async function fetchUserOffers(token) {
    return apiGet("/profile/ealans", token);
}

/**
* Delete a specific ad for the user
*/
export async function deleteUserOffer(category, adId, token) {
    const response = await fetch(`${BASE_URL}/profile/ealans/${category}/${adId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return { ok: response.ok, status: response.status };
}

/**
* Upload profile picture
*/
export async function uploadProfileImage(file, token) {
    const formData = new FormData();
    formData.append("profile_image", file);
    return apiPostForm("/profile-image", formData, token);
}

/**
* Upload cover image (banner)
*/
export async function uploadCoverImage(file, token) {
    const formData = new FormData();
    formData.append("cover_image", file);
    return apiPostForm("/cover-image", formData, token);
}

/**
* Update user details (name, email, mobile)
*/
export async function updateUserProfile(values, token) {
    const response = await fetch(`${BASE_URL}/profile/update`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}
