import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import useSEO from "../../../hooks/useSEO";
import "./loginStyle.css";

export default function Login() {
  useSEO("تسجيل الدخول", "سجّل دخولك إلى ماشي لمتابعة إعلاناتك وإدارة منتجاتك وخدماتك بسهولة.");

  return (
    <main className="page-center">
      <div className="top_line" />
      <div className="auth-box login_box">
        <div className="login-image">
          <img src="/images/login.webp" alt="login تسجيل الدخول" loading="lazy" />
        </div>
        <div className="login-container">
          <h1 className="login-title">مرحبًا بك مجددًا</h1>
          <p>
            مرحبًا بك من جديد! قم بتسجيل الدخول إلى حسابك على ماشي لتتابع إعلاناتك
            المنشورة، وتدير منتجاتك أو خدماتك بسهولة.
          </p>
          <LoginForm />
          <p className="login_footer">
            ليس لديك حساب بعد؟ <Link to="/register">إنشاء حساب</Link>
          </p>
        </div>
      </div>
    </main>
  );
}