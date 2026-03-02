import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import useSEO from "../../../hooks/useSEO";
import "./registerStyle.css";

export default function Register() {
  useSEO("إنشاء حساب", "سجّل حسابك الآن على ماشي لتتصفح الإعلانات بسهولة وتعرض منتجاتك أو خدماتك في المكان المناسب، بسرعة وأمان.");

  return (
    <main className="register-container">
      <div className="top_line" />
      <section className="auth-box register-box">
        {/* الصورة */}
        <div className="register-image">
          <img src="/images/login.webp" alt="إنشاء حساب" loading="lazy" />
        </div>

        {/* المحتوى */}
        <div className="register-content">
          <h1>إنشاء حساب جديد</h1>
          <p>
            سجّل حسابك الآن على ماشي لتتصفح الإعلانات بسهولة وتعرض منتجاتك أو
            خدماتك في المكان المناسب، بسرعة وأمان.
          </p>

          <RegisterForm />

          <p className="register-footer">
            هل لديك حساب بالفعل؟ <Link to="/login">تسجيل دخول</Link>
          </p>
        </div>
      </section>
    </main>
  );
};