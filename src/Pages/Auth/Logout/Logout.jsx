import React, { useContext, useState } from 'react'
import { contextData } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./logoutStyle.css"

export default function Logout({ setShowConfirm }) {
    const { token } = useContext(contextData);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [logoutIsLoading, setLogoutIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            setLogoutIsLoading(true);
            const response = await fetch(`https://mashi.coderaeg.com/api/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                removeCookie("token", { path: "/" });
                setLogoutIsLoading(false);
                return true;
            } else {
                alert("حدث خطأ أثناء تسجيل الخروج");
                return false;
            }
        } catch {
            alert("حدث خطأ أثناء الاتصال بالسيرفر أثناء تسجيل الخروج");
            return false;
        }
    };
    return (
        <div className="confirm_overlay">
            <div className="confirm_box">
                <h3 className="confirm_box_title">
                    هل تريد تسجيل الخروج من حسابك؟
                </h3>
                <p className="confirm_box_par">
                    يمكنك دائمًا تسجيل الدخول مرة أخرى لمتابعة نشاطك.
                </p>
                <div className="confirm_actions">
                    <button
                        className="cancel_btn_confirm"
                        onClick={() => setShowConfirm(false)}
                    >
                        إلغاء
                    </button>
                    <button
                        className="confirm_btn"
                        onClick={async () => {
                            const success = await handleLogout();
                            if (success) {
                                setShowConfirm(false);
                                navigate("/");
                            }
                        }}
                    >
                        <span>تسجيل الخروج</span>
                        {logoutIsLoading && (<div className="logoutLoader" />)}
                    </button>
                </div>
            </div>
        </div>
    )
}