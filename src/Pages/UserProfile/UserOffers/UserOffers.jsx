import React, { useContext, useEffect, useState } from 'react';
import { contextData } from '../../../Context/Context';
import { timeSince } from '../../SpecificCategory/SpecificCategory';
import SkeletonCard from '../../../Components/SkeletonCard/SkeletonCard';
import "./userOffersStyle.css"
import { useNavigate } from 'react-router-dom';

export default function UserOffers() {
    const { userID, token, fetchUserAds, adsIsLoading, userAdvertisements } = useContext(contextData);
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const deleteAdById = async (category, adId) => {
        try {
            setDeleting(true);
            const response = await fetch(`https://mashi.coderaeg.com/api/profile/ealans/${category}/${adId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setSuccessMessage("تم حذف الإعلان بنجاح");
                setTimeout(() => setSuccessMessage(""), 1000);
                fetchUserAds();
            } else {
                setError("حدث خطأ أثناء حذف الإعلان.");
            }
        } catch {
            setError("فشل الاتصال بالسيرفر أثناء الحذف.");
        } finally {
            setDeleting(false);
            setShowModal(false);
        }
    };


    useEffect(() => {
        if (userID && token) {
            fetchUserAds();
        }
    }, [userID, token]);

    return (
        <section className='userOffers_container'>
            <header className='userProfile_header'>
                <h2>قائمة عروضك</h2>
                <p>تابع وأدِر جميع عروضك بسهولة من هنا</p>
            </header>

            {adsIsLoading && <div className='isLoading'>{Array.from({ length: 4 }, (_, i) => (<SkeletonCard key={i} />))}</div>}

            {!adsIsLoading &&
                <div className="advertisements_list">
                    {userAdvertisements.map((ad) => (
                        <div key={`${ad.category}_${ad.id_ads}`} className="advertisements_card">
                            <div className="card_image">
                                <img
                                    src={`https://mashi.coderaeg.com/storage/${ad.images[0]}`}
                                    alt={ad.user.user_name}
                                    className="ad_image"
                                />
                            </div>

                            <div className="card_body">
                                <div className="card_content">
                                    <div className="">
                                        <h3 className="card_title">{ad.information.title}</h3>
                                        <div className="mapPin_timer">
                                            <div className="mapPin">
                                                <div className="mapPin_icon">
                                                    <img src="/Icons/MapPin.svg" alt="MapPin" />
                                                </div>
                                                <span>{ad?.user?.area || "غير محدد"}</span>
                                            </div>

                                            <div className="timer">
                                                <div className="timer_icon">
                                                    <img src="/Icons/Timer.svg" alt="Timer" />
                                                </div>
                                                <span>{timeSince(ad.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate(`/${ad?.category}/${ad.id_ads}`)}>عرض الإعلان</button>
                                </div>

                                <div className="card_buttons">
                                    <button className="edit_btn">تعديل</button>
                                    <button className="card_delete_btn" onClick={() => {
                                        setSelectedAd({
                                            id: ad.id_ads,
                                            category: ad.category,
                                        });
                                        setShowModal(true);
                                    }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

            {successMessage && <p className="success">{successMessage}</p>}

            {showModal && (
                <div className="modal_overlay">
                    <div className="modal_box">
                        <h4>هل أنت متأكد من حذف هذا الإعلان؟</h4>
                        <p>لن تتمكن من استرجاعه بعد الحذف.</p>
                        <div className="modal_actions">
                            <button
                                className="confirm_delete_btn"
                                onClick={() => deleteAdById(selectedAd.category, selectedAd.id)}
                                disabled={deleting}
                            >
                                {deleting ? "جارٍ الحذف..." : "نعم، حذف"}
                            </button>
                            <button
                                className="cancel_btn"
                                onClick={() => setShowModal(false)}
                                disabled={deleting}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}