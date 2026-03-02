import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import { loginUser } from "../../../services/authService";
import { EmailIcon, EyeIcon, EyeOffIcon } from "../../../Components/UI/Icons/Icons";

/**
* Login form - standalone and reusable
*/

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const [, setCookie] = useCookies(["token"]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
            password: Yup.string().required("كلمة المرور مطلوبة"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const { ok, data } = await loginUser(values);
                if (ok) {
                    setCookie("token", data, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 30,
                        sameSite: "lax",
                        secure: process.env.NODE_ENV === "production",
                    });
                    navigate("/");
                } else if (data.errors) {
                    setErrorMessage(data.errors.email ? "هذا البريد الإلكتروني غير مسجل" : "كلمة المرور خطأ");
                } else {
                    setErrorMessage("حدث خطأ أثناء التسجيل، حاول مرة أخرى.");
                }
            } catch {
                setErrorMessage("حدث خطأ، حاول مرة أخرى");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <form className="login_form" onSubmit={formik.handleSubmit} noValidate>
            {/* البريد الإلكتروني */}
            <div className="input_container">
                <label htmlFor="email" className="input_label">
                    <span>بريدك الإلكتروني</span>
                    {formik.touched.email && formik.errors.email && (
                        <p className="error_message" role="alert">{formik.errors.email}</p>
                    )}
                </label>
                <div className="input_field">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="بريدك الإلكتروني"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-describedby={formik.touched.email && formik.errors.email ? "email-error" : undefined}
                    />
                    <div className="input_icon">
                        <EmailIcon width={24} height={24}/>
                    </div>
                </div>
            </div>

            {/* كلمة المرور */}
            <div className="input_container">
                <label htmlFor="password" className="input_label">
                    <span>كلمة المرور</span>
                    {formik.touched.password && formik.errors.password && (
                        <p className="error_message" role="alert">{formik.errors.password}</p>
                    )}
                </label>
                <div className="input_field">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="input"
                        placeholder="كلمة المرور"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <button
                        type="button"
                        className="input_icon"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                    >
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                </div>
            </div>

            {/* تذكرني / نسيت كلمة المرور */}
            <div className="forgetPassword">
                <label className="rememberMe rememberMe_label">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="rememberMe_checkbox"
                    />
                    <span>تذكرني</span>
                </label>
                <Link to="/forgotPassword">نسيت كلمة المرور؟</Link>
            </div>

            <button type="submit" className="login_button" disabled={isLoading}>
                {isLoading ? "جارٍ التحميل..." : "تسجيل دخول"}
            </button>

            {errorMessage && <p className="error_general" role="alert">{errorMessage}</p>}
        </form>
    );
};