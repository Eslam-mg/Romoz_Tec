import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonCard from '../../Components/SkeletonCard/SkeletonCard';
import NotFound from '../../Components/NotFound/NotFound';
import AdCard from '../../Components/AdCard/AdCard';
import "./showAnyUserStyle.css"

export default function ShowAnyUser() {
    const { userID } = useParams();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://mashi.coderaeg.com/api/showAnyUserData/${userID}`, { method: "GET", });

                const data = await response.json();
                if (data.success) {
                    setUserData(data.data);
                    setIsLoading(false)
                    setErrorMessage("");
                } else {
                    setErrorMessage("فشل في تحميل بيانات المستخدم.");
                }
            } catch {
                setErrorMessage("حدث خطأ أثناء تحميل البيانات.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userID]);

    return (
        <section className="showAnyUserData">
            {isLoading && (
                <div className="loading_data">
                    <div className="loading_image">
                        <div className="skeleton_image">
                            <svg className="skeleton-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            </svg>
                            <div className="profile_user_image">
                                <svg className="skeleton-user-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="skeleton_user_info line1" />
                    </div>

                    <div className="isLoading">
                        {Array.from({ length: 4 }, (_, i) => (<SkeletonCard key={i} />))}
                    </div>
                </div>
            )}

            {errorMessage && <NotFound />}

            {!isLoading && !errorMessage && (
                <div className="showAnyUserData_container">
                    <div className="user_data">
                        <div className="user_images">
                            <div className="cover_user_image">
                                <img src={userData?.user?.cover_image} alt="صورة الكوفر" loading="lazy" />
                            </div>

                            <div className="profile_user_image">
                                <div className="user_img_container">
                                    <img src={userData?.user?.profile_image} alt="img" loading="lazy" />
                                </div>
                                <div className="status_dot" style={{ backgroundColor: userData?.user?.is_online ? "var(--main-color)" : "var(--parg-color)" }} />
                            </div>
                        </div>

                        <div className="user_info">
                            <h3 className="user_name">{userData?.user?.name?.split(" ").slice(0, 2).join(" ")}</h3>
                            {!userData?.user?.is_online && (
                                <h6 className="user_status">
                                    <span>آخر ظهور  </span>
                                    <span>{userData?.user?.last_seen_at}</span>
                                </h6>
                            )}
                        </div>

                        {errorMessage && <p className="error_message">{errorMessage}</p>}
                    </div>

                    <div className="categories_items">
                        {userData?.data?.map((cat, index) => (
                            <AdCard
                                key={index}
                                category={cat?.category}
                                adID={cat?.ad?.id_ads}
                                img={cat?.ad?.images[0]}
                                title={cat?.ad?.information?.title}
                                sellerName={cat?.ad?.seller?.name}
                                userID={cat?.ad?.user?.id_user}
                                showUserImg={false}
                                userImg={cat?.ad?.user?.profile_image}
                                area={cat?.ad?.user?.area}
                                created_at={cat?.ad?.created_at}
                                price={cat?.ad?.information?.price}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
};