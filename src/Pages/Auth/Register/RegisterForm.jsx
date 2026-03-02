import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../services/authService";
import { EmailIcon, EyeIcon, EyeOffIcon, PhoneIcon, UserIcon } from "../../../Components/UI/Icons/Icons";

/**
 * نموذج إنشاء الحساب - مستقل ويمكن إعادة استخدامه
 */
export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModdel, setShowModdel] = useState(false);

    const navigate = useNavigate();
    const [, setCookie] = useCookies(["token"]);

    const validationSchema = Yup.object({
        name: Yup.string().trim().required("الرجاء إدخال الاسم الكامل"),
        email: Yup.string()
            .email("بريد إلكتروني غير صالح")
            .required("الرجاء إدخال البريد الإلكتروني"),
        phone: Yup.string()
            .required("رقم الجوال مطلوب")
            .matches(
                /^(05\d{8}|\+?9665\d{8})$/,
                "يرجى إدخال رقم جوال سعودي صالح يبدأ بـ 05 أو 9665"
            ),
        password: Yup.string().required("الرجاء إدخال كلمة المرور"),
        password_confirmation: Yup.string()
            .required("الرجاء تأكيد كلمة المرور")
            .oneOf([Yup.ref("password"), null], "كلمات المرور غير متطابقة"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const { ok, data } = await registerUser(values);

                if (ok && data.success) {
                    setIsLoading(false);
                    setShowModdel(true);
                    setCookie("token", data, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 30,
                        sameSite: "lax",
                        secure: process.env.NODE_ENV === "production",
                    });
                } else if (data.errors) {
                    const hasEmailError = data.errors.email;
                    const hasPhoneError = data.errors.phone;

                    if (hasEmailError && hasPhoneError) {
                        setErrorMessage("هذا البريد الإلكتروني ورقم الجوال مستخدمان بالفعل");
                    } else if (hasEmailError) {
                        setErrorMessage("هذا البريد الإلكتروني مستخدم بالفعل");
                    } else if (hasPhoneError) {
                        setErrorMessage("رقم الجوال مستخدم بالفعل");
                    } else {
                        setErrorMessage("حدث خطأ أثناء التحقق من البيانات");
                    }
                } else {
                    setErrorMessage("حدث خطأ أثناء التسجيل، حاول مرة أخرى.");
                }
            } catch {
                setErrorMessage("حدث خطأ في الاتصال بالخادم، حاول مرة أخرى لاحقًا.");
            } finally {
                setIsLoading(false);
            }
        },
    });

    const closeModel = () => {
        setShowModdel(false);
        navigate("/userProfile/userSettings");
    };

    useEffect(() => {
        if (showModdel) {
            const timer = setTimeout(() => navigate("/userProfile/userSettings"), 1000);
            return () => clearTimeout(timer);
        }
    }, [showModdel]);

    return (
        <>
            <form className="register_form" onSubmit={formik.handleSubmit} noValidate>
                {/* الاسم الكامل */}
                <div className="input_container">
                    <label htmlFor="name" className="input_label">
                        <span>الاسم الكامل</span>
                        {formik.touched.name && formik.errors.name && (
                            <p className="error_message" role="alert">{formik.errors.name}</p>
                        )}
                    </label>
                    <div className="input_field">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="input"
                            placeholder="الاسم الكامل"
                            autoComplete="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <UserIcon width={24} height={24} className="input_icon"/>
                    </div>
                </div>

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
                        />
                        <EmailIcon width={24} height={24} className="input_icon"/>
                    </div>
                </div>

                {/* رقم الجوال */}
                <div className="input_container">
                    <label htmlFor="phone" className="input_label">
                        <span>رقم الجوال</span>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="error_message" role="alert">{formik.errors.phone}</p>
                        )}
                    </label>
                    <div className="input_field">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="input"
                            placeholder="05xxxxxxxx أو +9665xxxxxxxx"
                            autoComplete="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <PhoneIcon width={24} height={24} className="input_icon"/>
                    </div>
                </div>

                {/* كلمة المرور وتأكيدها */}
                <div className="two_password">
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
                                autoComplete="new-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <button
                                type="button"
                                className="eye_Icon"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                            >
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </button>
                        </div>
                    </div>

                    {/* تأكيد كلمة المرور */}
                    <div className="input_container">
                        <label htmlFor="password_confirmation" className="input_label">
                            <span>تأكيد كلمة المرور</span>
                            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                <p className="error_message" role="alert">{formik.errors.password_confirmation}</p>
                            )}
                        </label>
                        <div className="input_field">
                            <input
                                className="input"
                                type={showConfirmPassword ? "text" : "password"}
                                id="password_confirmation"
                                name="password_confirmation"
                                placeholder="تأكيد كلمة المرور"
                                autoComplete="new-password"
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <button
                                type="button"
                                className="input_icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"}
                            >
                                {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="regis_button"
                    disabled={isLoading}
                >
                    {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
                </button>

                {errorMessage && <p className="error_general" role="alert">{errorMessage}</p>}
            </form>

            {/* موديل النجاح */}
            {showModdel && (
                <div className="success_model">
                    <div className="success_content">
                        <h3>تم إنشاء الحساب بنجاح!</h3>
                        <p>يمكنك الآن تسجيل الدخول إلى حسابك.</p>
                        <button onClick={closeModel}>متابعة</button>
                    </div>
                </div>
            )}
        </>
    );
}
