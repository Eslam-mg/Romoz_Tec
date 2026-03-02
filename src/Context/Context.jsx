import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchUser } from '../services/userService';
import { fetchUserAds as fetchUserAdsService } from '../services/adsService';
import { fetchFavorites } from '../services/favoritesService';

export const contextData = createContext();

export default function StoreContextProvider({ children }) {
    const [cookies] = useCookies(["token"]);
    const userID = cookies?.token?.data?.user?.id;
    const token = cookies?.token?.data?.token;

    // بيانات المستخدم
    const [userData, setUserData] = useState({});
    const fetchUserData = async () => {
        if (!userID || !token) return;
        try {
            const data = await fetchUser(userID, token);
            setUserData(data.data);
        } catch (err) {
            console.error("fetchUserData error:", err.message);
        }
    };

    // إعلانات المستخدم
    const [userAdvertisements, setUserAdvertisements] = useState([]);
    const [adsIsLoading, setAdsIsLoading] = useState(false);
    const fetchUserAds = async () => {
        if (!token) return;
        setAdsIsLoading(true);
        try {
            const data = await fetchUserAdsService(token);
            setUserAdvertisements(data?.data?.data || []);
        } catch {
            setUserAdvertisements([]);
        } finally {
            setAdsIsLoading(false);
        }
    };

    // المفضلة
    const [showFavoriteToast, setShowFavoriteToast] = useState(false);
    const [favorites, setFavorites] = useState({});
    const fetchUserFavorites = async () => {
        if (!token) return;
        try {
            const data = await fetchFavorites(token);
            setFavorites(data?.data || {});
        } catch (err) {
            console.error("fetchUserFavorites error:", err.message);
        }
    };

    return (
        <contextData.Provider value={{
            userID,
            token,
            fetchUserData,
            userData,
            fetchUserFavorites,
            favorites,
            fetchUserAds,
            userAdvertisements,
            adsIsLoading,
            showFavoriteToast,
            setShowFavoriteToast,
        }}>
            {children}
        </contextData.Provider>
    );
}