import { apiGet } from "./api";

/**
* Retrieving current user data
*/
export async function fetchUser(userID, token) {
    return apiGet(`/user/${userID}`, token);
}

/**
* Retrieve any user's data by ID
*/
export async function fetchAnyUser(userID) {
    return apiGet(`/user/${userID}`);
}
