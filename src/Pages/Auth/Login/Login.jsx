import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import "./loginStyle.css";
import { EmailIcon, EyeIcon, EyeOffIcon } from "../../../Components/UI/Icons/Icons";

export default function Login() {

  return (
    <div className="login-wrapper">
      <div className="top_line" />
      <div className="login_box">
        <div className="login-image">
          <img src="/images/login.webp" alt="login" />
        </div>
        <div className="login-container">
          <h2>مرحبًا بك مجددًا</h2>
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
    </div>
  );
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("بريد إلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string()
        .required("كلمة المرور مطلوبة"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`https://mashi.coderaeg.com/api/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        if (response.ok) {
          navigate("/");
          setCookie("token", data, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });
        } else if (data.errors) {
          const hasEmailError = data.errors.email;

          if (hasEmailError) {
            setErrorMessage("هذا البريد الإلكتروني غير مسجل ");
          } else {
            setErrorMessage("كلمة المرور خطأ");
          }
        } else {
          setErrorMessage("حدث خطأ أثناء التسجيل، حاول مرة أخرى.");
        }
      } catch (err) {
        setErrorMessage("حدث خطأ، حاول مرة أخرى");
      } finally {
        setIsLoading(false);
      }
    }
  });
  return (
    <form className="login_form" onSubmit={formik.handleSubmit}>
      <div className="input_container">
        <label htmlFor="email" className="input_label">
          <span>بريدك الإلكتروني</span>
          {formik.touched.email && formik.errors.email && (
            <p className="error_message">{formik.errors.email}</p>
          )}
        </label>

        <div className="input_field">
          <input
            type="email"
            name="email"
            className='input'
            placeholder="بريدك الإلكتروني"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="input_icon">
            <EmailIcon/>
          </div>
        </div>
      </div>

      <div className="input_container">
        <label htmlFor="password" className="input_label">
          <span>كلمة المرور</span>
          {formik.touched.password && formik.errors.password && (
            <p className="error_message">{formik.errors.password}</p>
          )}
        </label>

        <div className="input_field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className='input'
            placeholder="كلمة المرور"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="input_icon" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "إخفاء كلمة المرور" : "عرض كلمة المرور"}>
            {showPassword ? <EyeIcon/> : <EyeOffIcon/>}
          </div>
        </div>
      </div>

      <div className="forgetPassword">
        <div className="rememberMe">
          <div className="rememberMe_section">
            <label className="rememberMe_label">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rememberMe_checkbox"
              />
            </label>
          </div>
          <p>تذكرني</p>
        </div>
        <div role="button">
          <Link to="/forgotPassword">نسيت كلمة المرور؟</Link>
        </div>
      </div>

      <button type="submit" className="login_button" disabled={isLoading}>
        {isLoading ? "جاري التحميل..." : "تسجيل دخول"}
      </button>

      {errorMessage && <p className="error_general">{errorMessage}</p>}
    </form>
  )
};