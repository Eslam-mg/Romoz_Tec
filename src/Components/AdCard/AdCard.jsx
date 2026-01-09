import React, { useContext, useState } from 'react';
import "./adCardStyle.css"
import { useNavigate } from 'react-router-dom';
import { timeSince } from '../../Pages/SpecificCategory/SpecificCategory';
import { contextData } from '../../Context/Context';

export default function AdCard({ category, adID, img, title, sellerName, userID, showUserImg = "true", userImg, area, created_at, price, isFavorite = "false" }) {
    const { token, setShowFavoriteToast } = useContext(contextData);
    const navigate = useNavigate();

    // handle favorite toggle
    const [favorites, setFavorites] = useState({});
    const toggleFavorite = (e, id) => {
        e.stopPropagation();
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const addToFavorites = async (category, adId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://mashi.coderaeg.com/api/favorites/${category}/${adId}`,
                {
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setIsLoading(false);
            } else {
                setErrorMessage("حدث خطأ أثناء الاضافة للمفضلة.");
            }
        } catch {
            setErrorMessage("فشل الاتصال بالسيرفر أثناء الاضافة.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavoriteClick = (e, category, adID) => {
        e.stopPropagation();
        if (!token) {
            setShowFavoriteToast(true);
            return;
        }
        toggleFavorite(e, adID);
        addToFavorites(category, adID);
    };

    return (
        <div className="ad_card" onClick={() => navigate(`/${category}/${adID}`)}>
            <div className="card_image">
                <img src={`https://mashi.coderaeg.com/storage/${img}`} alt={title} />
            </div>

            {showUserImg &&
                <div className="card_user" onClick={(e) => { e.stopPropagation(); navigate(`/user/${sellerName}/${userID}`) }}>
                    <div className="img_container">
                        {userImg ? (
                            <img src={userImg} alt={sellerName} />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx={12} cy={8} r={5} /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        )}
                    </div>
                    <span>{sellerName.split(" ").slice(0, 2).join(" ")}</span>
                </div>
            }

            <div className="card_body" style={{ marginTop: showUserImg ? "0px" : "5px" }}>
                <h3>{title.substring(0, 16)}...</h3>
                <div className="mapPin_timer">
                    <div className="mapPin">
                        <div className="mapPin_icon">
                            <img src="/Icons/MapPin.svg" alt="MapPin" />
                        </div>
                        <span>{area || "غير محدد"}</span>
                    </div>
                    <div className="timer">
                        <div className="timer_icon">
                            <img src="/Icons/Timer.svg" alt="Timer" />
                        </div>
                        <span>{timeSince(created_at)}</span>
                    </div>
                </div>
            </div>

            <div className="card_footer">
                <div className="card_footer_price">
                    <span className=''>{price !== "0.00" ? price : "غير محدد"} ر.س</span>
                </div>
                <div className="hart_icon" onClick={(e) => { handleFavoriteClick(e, category, adID) }}>
                    {isFavorite ?
                        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill={favorites[adID] ? "red" : "none"} stroke={favorites[adID] ? "red" : "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    }
                </div>
            </div>
        </div>
    )
};