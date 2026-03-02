import { apiPost } from "./api";

/**
 * login
*/
export async function loginUser(values) {
    return apiPost("/login", values);
}

/**
 * Create a new account
 */
export async function registerUser(values) {
    return apiPost("/register", values);
}

/**
* Forgot your password
*/
export async function forgotPassword(email) {
    return apiPost("/forgot-password", { email });
}

/**
* Reset Password
*/
export async function resetPassword(values) {
    return apiPost("/reset-password", values);
}
