import React, { useContext, useState } from 'react'
import { contextData } from '../../../Context/Context';
import "./deleteAcountStyle.css"
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function DeleteAcount() {
    const { token } = useContext(contextData);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        try {
            const baseUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`https://mashi.coderaeg.com/api/profile/delete`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await resp.json();

            if (response.ok && data.success) {
                return true;
            } else {
                alert("حدث خطأ أثناء حذف الحساب");
                return false;
            }
        } catch (error) {
            alert("خطأ في الاتصال بالخادم");
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='delete_container'>
            <header>
                <h3>هل أنت متأكد أنك تريد حذف حسابك؟</h3>
                <p>سيؤدي هذا الإجراء إلى حذف جميع بياناتك وإعلاناتك بشكل نهائي، ولن تتمكن من استعادتها بعد ذلك.</p>
            </header>
            <div className="">
                <button className='delete_btn' onClick={() => { setShowModal(true) }}>حذف الحساب نهائيًا</button>
            </div>

            {showModal &&
                <div className="confirm_overlay">
                    <div className="confirm_box">
                        <h3 className="confirm_box_title">
                            هل ترغب في حذف حسابك؟
                        </h3>
                        <p className="confirm_box_par">
                            حذف حسابك سيؤدي إلى فقدان جميع بياناتك وإعلاناتك
                        </p>
                        {!confirmDeletion ?
                            <div className="confirm_actions">
                                <button
                                    className="cancel_delete_btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    إلغاء
                                </button>
                                <button
                                    className="confirm_delete_btn"
                                    onClick={async () => {
                                        const success = await handleDeleteAccount();
                                        if (success) {
                                            setConfirmDeletion(true);
                                            setTimeout(() => {navigate("/"); removeCookie("token");}, 2000);
                                        }
                                    }}
                                >
                                    <span>حذف الحساب</span>
                                    {isLoading && (<div className="deleteLoader" />)}
                                </button>
                            </div>
                            : <p>تم حذف الحساب نهائيًا</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}