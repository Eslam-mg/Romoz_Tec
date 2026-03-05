import React, { useContext, useEffect } from 'react';
import "./accountUserStyle.css"
import { contextData } from '../../../Context/Context';
import AdCard from '../../../Components/AdCard/AdCard';

export default function AccountUser() {
    const { userID, token, fetchUserData, userData, fetchUserAds, userAdvertisements, adsIsLoading } = useContext(contextData);
    // console.log(userAdvertisements);
    useEffect(() => {
        if (userID && token) {
            fetchUserData();
            fetchUserAds();
        }
    }, [userID, token]);
    return (
        <section className='userprofile-page'>
            <header className='userProfile_header'>
                <h2>ملفك الشخصي من <span>ماشي</span></h2>
                <p>عرّف بنفسك واجعل ملفك أكثر وضوحًا</p>
            </header>

            <div className="accountUser_body">
                <div className="user_data">
                    <div className="user_images">
                        <div className="cover_user_image">
                            {userData?.cover_image ?
                                <img src={userData?.cover_image} alt="img cover" loading="lazy" />
                                :
                                <svg className="skeleton-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                            }
                        </div>

                        <div className="profile_user_image">
                            <div className="user_img_container">
                                {userData?.profile_image ?
                                    <img src={userData?.profile_image} alt="img" loading="lazy" />
                                    :
                                    <svg className="skeleton-user-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="user_info">
                        <h3 className="user_name">{userData?.name?.split(" ").slice(0, 2).join(" ")}</h3>
                    </div>
                </div>

                <div className="accountUser_Advertisements">
                    {userAdvertisements.length > 0 ? (
                        userAdvertisements.map((ad) => (
                            <AdCard
                                key={`${ad?.category}_${ad?.id_ads}`}
                                category={ad?.category}
                                adID={ad?.id_ads}
                                img={ad?.images[0]}
                                title={ad?.information?.title}
                                sellerName={ad?.seller?.name}
                                userID={ad?.user?.id_user}
                                showUserImg={false}
                                userImg={ad?.user?.profile_image}
                                area={ad?.user?.area}
                                created_at={ad?.created_at}
                                price={ad?.information?.price}
                            />
                        ))
                    ) : (
                        <p className="no-ads">لا توجد إعلانات حالياً</p>
                    )}
                </div>
            </div>
        </section>
    )
};