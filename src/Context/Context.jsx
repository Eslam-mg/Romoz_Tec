import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const contextData = createContext();

export default function StoreContextProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const userID = cookies?.token?.data?.user?.id;
    const token = cookies?.token?.data?.token;
    const [userData, setUserData] = useState({});
    const fetchUserData = async () => {
        try {
            // url from vite.config
            const response = await fetch(`https://mashi.coderaeg.com/api/user/${userID}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    // fetch user Advertisements 
    const [userAdvertisements, setUserAdvertisements] = useState([]);
    const [adsIsLoading, setadsIsLoading] = useState(false);
    const fetchUserAds = async () => {
        try {
            setadsIsLoading(true);

            const response = await fetch(`https://mashi.coderaeg.com/api/profile/ealans`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const dataAds = await response.json();
            setUserAdvertisements(dataAds.data?.data || []);
        } catch {
            setError("فشل الاتصال بالسيرفر.");
        } finally {
            setadsIsLoading(false);
        }
    };

    // handle favorite toggle
    const [showFavoriteToast, setShowFavoriteToast] = useState(false);
    const [favorites, setFavorites] = useState({});
    const fetchUserFavorites = async () => {
        try {
            const res = await fetch(`https://mashi.coderaeg.com/api/favorites`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setFavorites(data?.data || {});
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <contextData.Provider value={{ userID, token, fetchUserData, userData, fetchUserFavorites, favorites, fetchUserAds, userAdvertisements, adsIsLoading, showFavoriteToast, setShowFavoriteToast }}>
            {children}
        </contextData.Provider>
    )
};