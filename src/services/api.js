export const BASE_URL = "https://mashi.coderaeg.com/api";
export const STORAGE_URL = "https://mashi.coderaeg.com/storage";

/**
 * Helper: GET request
*/
export async function apiGet(endpoint, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, { method: "GET", headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

/**
 * Helper: POST request (JSON body)
*/
export async function apiPost(endpoint, body, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}

/**
 * Helper: POST request (FormData / multipart)
*/
export async function apiPostForm(endpoint, formData, token) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}