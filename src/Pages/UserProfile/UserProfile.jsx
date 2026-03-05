import React, { useContext, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { contextData } from '../../Context/Context';
import SideBarUserProfile from '../../Components/SideBarUserProfile/SideBarUserProfile';
import PrivateRoute from '../../Components/Auth/PrivateRoute';
import useOutsideClick from '../../hooks/useOutsideClick';
import useSEO from '../../hooks/useSEO';
import "./userProfileStyle.css";

export default function UserProfile() {
    useSEO("ملفي الشخصي", "إدارة حسابك وإعلاناتك ومفضلتك على منصة ماشي.");
    const { token } = useContext(contextData);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const sidebarRef = useRef(null);
    const toggleBtnRef = useRef(null);

    const closeSidebar = () => setToggleSidebar(false);
    useOutsideClick([sidebarRef, toggleBtnRef], toggleSidebar, closeSidebar);

    return (
        <PrivateRoute token={token}>
            <div className="userProfile">
                <button
                    type="button"
                    className="toggle_sidebar"
                    onClick={() => setToggleSidebar((prev) => !prev)}
                    ref={toggleBtnRef}
                    aria-label={toggleSidebar ? "إغلاق القائمة الجانبية" : "فتح القائمة الجانبية"}
                    aria-expanded={toggleSidebar}
                >
                    {toggleSidebar ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M12 3v18" /></svg>
                    )}
                </button>
                <SideBarUserProfile
                    toggleSidebar={toggleSidebar}
                    setToggleSidebar={setToggleSidebar}
                    sidebarRef={sidebarRef}
                />
                <Outlet />
            </div>
        </PrivateRoute>
    );
}