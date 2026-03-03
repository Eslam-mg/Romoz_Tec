import React from "react";
import { Link } from "react-router-dom";
import { getInitials, getShortName } from "../../utils/helpers";
import "./profileCardStyle.css";
import { UserIcon } from "../UI/Icons/Icons";

/**
* User information card in navigation bar
*/
export default function ProfileCard({ toggleProfileCard, userData, setShowConfirm }) {
    return (
        <div className="profile_card" style={{ height: toggleProfileCard ? "280px" : "0" }}>
            <div className="user-info">
                {userData?.profile_image === null ? (
                    <UserIcon width={20} height={20} className="user_icon" />
                ) : (
                    <img src={userData.profile_image} alt={getInitials(userData?.name)} className="user_img" />
                )}
                <div>
                    <p className="greeting">أهلا</p>
                    <p className="username">{getShortName(userData?.name)}</p>
                </div>
            </div>

            <Link to="/userProfile" className="show_accountUser">
                <span>عرض الملف الشخصي</span>
            </Link>

            <Link to="/userProfile/userSettings" className="settings">
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx={12} cy={12} r={3} /></svg>
                <span>إعدادات الحساب</span>
            </Link>

            <button type="button" className="logout-btn" onClick={() => setShowConfirm(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out" aria-hidden="true"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
                <span>تسجيل الخروج</span>
            </button>
        </div>
    );
};