import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { contextData } from "../../Context/Context";
import Logout from "../../Pages/Auth/Logout/Logout";
import ProfileCard from "./ProfileCard";
import ToastWarning from "../UI/ToastWarning/ToastWarning";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getInitials } from "../../utils/helpers";
import "./navbarStyle.css";
import { PlusIcon, UserIcon } from "../UI/Icons/Icons";

// Re-export for compatibility with old imports
export { default as ToastWarning } from "../UI/ToastWarning/ToastWarning";

export default function Navbar() {
  const { userID, token, fetchUserData, userData, showFavoriteToast, setShowFavoriteToast } = useContext(contextData);
  const isLoggedIn = Boolean(token && token !== "undefined");

  const [showToast, setShowToast] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toggleProfileCard, setToggleProfileCard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const desktopProfileRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeProfileCard = useCallback(() => setToggleProfileCard(false), []);
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setToggleProfileCard(false);
  }, []);

  // إغلاق بطاقة الملف الشخصي عند الضغط خارجها
  useOutsideClick([mobileProfileRef, desktopProfileRef], toggleProfileCard, closeProfileCard);

  // إغلاق القائمة عند الضغط خارجها
  useOutsideClick([menuRef, toggleRef], menuOpen, closeMenu);

  // Close navigation elements when scrolling on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) closeAll();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeAll]);

  useEffect(() => {
    if (userID && token) fetchUserData();
  }, [userID, token]);

  return (
    <header className="navbar">
      <nav className="navbar_container">
        <div className="logo">
          <NavLink to="/" onClick={closeMenu} aria-label="الصفحة الرئيسية - ماشي">
            <img src="/images/logo.svg" alt="شعار ماشي" />
          </NavLink>
        </div>

        {/* Navigation Menu */}
        <ul id="primary-navigation" ref={menuRef} className={`nav ${menuOpen ? "openNav" : ""}`} role="list">
          <li><NavLink to="/" onClick={closeMenu}><span>الرئيسية</span></NavLink></li>
          <li><NavLink to="/contactUs" onClick={closeMenu}><span>اتصل بنا</span></NavLink></li>
          <li><NavLink to="/aboutUs" onClick={closeMenu}><span>من نحن</span></NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu}><span>المدونه</span></NavLink></li>
        </ul>

        <div className="navbar_buttons">
          {/* Desktop buttons */}
          <div className="desktop_buttons">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => setToggleProfileCard((prev) => !prev)}
                className="btn_profile"
                ref={desktopProfileRef}
                aria-expanded={toggleProfileCard}
                aria-haspopup="true"
              >
                <span>حسابي</span>
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            ) : (
              <NavLink to="/login" className="login_link">
                <span>تسجيل الدخول</span>
              </NavLink>
            )}

            <NavLink to="/advertisements" className="advertisements_buttom">
              <span>اضف عرضك</span>
              <PlusIcon width={22} height={22}/>
            </NavLink>
          </div>

          {/* Mobile phone buttons */}
          <div className="menu-mobile-toggle">
            <div className="mobile-login">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => setToggleProfileCard((prev) => !prev)}
                  className="header_profile_img"
                  ref={mobileProfileRef}
                  aria-label="فتح قائمة المستخدم"
                  aria-expanded={toggleProfileCard}
                >
                  {userData?.profile_image === null ? (
                    <UserIcon width={24} height={24} className="user_icon"/>
                  ) : (
                    <img src={userData?.profile_image} alt={`صورة ${getInitials(userData?.name)}`} className="user_img" />
                  )}
                </button>
              ) : (
                <NavLink to="/login" className="mobile_loginBTN" aria-label="تسجيل الدخول">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>
                </NavLink>
              )}
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="menu_toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h18" /><path d="M3 12h18" /><path d="M3 19h18" /></svg>
            </button>
          </div>

          {/* Profile Card */}
          {isLoggedIn && (
            <ProfileCard
              toggleProfileCard={toggleProfileCard}
              userData={userData}
              setShowConfirm={setShowConfirm}
            />
          )}
        </div>
      </nav>

      {/* Alerts */}
      {isLoggedIn && showToast && userData?.area === null && (
        <ToastWarning message="الرجاء إضافة الموقع قبل المتابعة." onClose={() => setShowToast(false)} />
      )}
      {showFavoriteToast && (
        <ToastWarning message="قم بتسجيل الدخول أولاً" onClose={() => setShowFavoriteToast(false)} />
      )}
      {showConfirm && <Logout setShowConfirm={setShowConfirm} />}
    </header>
  );
}