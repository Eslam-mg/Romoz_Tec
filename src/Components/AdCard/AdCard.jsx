import React, { useContext, useState } from 'react';
import "./adCardStyle.css";
import { useNavigate } from 'react-router-dom';
import { formatPrice, timeSince } from '../../utils/helpers';
import { contextData } from '../../Context/Context';
import { toggleFavorite } from '../../services/favoritesService';
import { STORAGE_URL } from '../../services/api';
import { UserIcon } from '../UI/Icons/Icons';

export default function AdCard({ category, adID, img, title, sellerName, userID, showUserImg = "true", userImg, area, created_at, price, isFavorite = "false" }) {
    const { token, setShowFavoriteToast } = useContext(contextData);
    const navigate = useNavigate();

    const [isFav, setIsFav] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();
        if (!token) {
            setShowFavoriteToast(true);
            return;
        }
        setIsFav((prev) => !prev);
        setIsLoading(true);
        try {
            await toggleFavorite(category, adID, token);
        } catch {
            setIsFav((prev) => !prev); // revert on error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ad_card" onClick={() => navigate(`/${category}/${adID}`)}>
            <div className="card_image">
                <img
                    src={`${STORAGE_URL}/${img}`}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                />
            </div>

            {showUserImg && (
                <div
                    className="card_user"
                    role="link"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); navigate(`/user/${sellerName}/${userID}`); }}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/user/${sellerName}/${userID}`)}
                >
                    <div className="img_container">
                        {userImg ? (
                            <div className="user_img">
                                <img src={userImg} alt={sellerName} loading="lazy" />
                            </div>
                        ) : (
                            <UserIcon width={20} height={20} className="user_icon" />
                        )}
                    </div>
                    <span>{sellerName?.split(" ").slice(0, 2).join(" ")}</span>
                </div>
            )}

            <div className="card_body" style={{ marginTop: showUserImg ? "0px" : "5px" }}>
                <h3>{title?.substring(0, 16)}...</h3>
                <div className="mapPin_timer">
                    <div className="mapPin">
                        <div className="mapPin_icon">
                            <img src="/Icons/MapPin.svg" alt="" aria-hidden="true" />
                        </div>
                        <span>{area || "غير محدد"}</span>
                    </div>
                    <div className="timer">
                        <div className="timer_icon">
                            <img src="/Icons/Timer.svg" alt="" aria-hidden="true" />
                        </div>
                        <span>{timeSince(created_at)}</span>
                    </div>
                </div>
            </div>

            <div className="card_footer">
                <div className="card_footer_price">
                    <span>{formatPrice(price)} ر.س</span>
                </div>
                <button
                    type="button"
                    className="hart_icon"
                    onClick={handleFavoriteClick}
                    disabled={isLoading}
                    aria-label={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                >
                    {isFavorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill={isFav ? "red" : "none"} stroke={isFav ? "red" : "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    )}
                </button>
            </div>
        </div>
    );
}