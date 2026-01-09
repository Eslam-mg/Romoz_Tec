import React, { useContext, useEffect, useState } from 'react';
import "./userSettingsStyle.css"
import { contextData } from '../../../Context/Context';
import { useFormik } from 'formik';
import * as Yup from "yup";
import LocationForm from '../../../Components/LocationForm/LocationForm';
import DeleteAcount from '../../Auth/DeleteAcount/DeleteAcount';

export default function UserSettings() {
    const { userID, token, fetchUserData, userData } = useContext(contextData);
    const [showContent, setShowContent] = useState("profile");
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const convertToWebP = async (file, quality = 0.9) => {
        const imageBitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0);

        const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/webp", quality)
        );

        const webpFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + ".webp",
            { type: "image/webp" }
        );

        return webpFile;
    };

    const sendImage = async (name, file, endPoint) => {
        const formData = new FormData();
        formData.append(name, file);

        const response = await fetch(endPoint, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        const data = await response.json();
        if (response.ok && data?.success) {
            return data?.data?.image;
        } else {
            throw new Error(data?.message || "فشل رفع الصورة");
        }
    };

    const [imageLoading, setImageLoading] = useState(false);
    const handleImageUpload = async (event, name, endPoint) => {
        const file = event.target.files[0];
        if (!file) return;

        setImageLoading(true);
        try {
            const webpFile = await convertToWebP(file);
            const imageUrl = await sendImage(name, webpFile, endPoint);
            if (name === "profile_image") setProfileImage(URL.createObjectURL(webpFile));
            else if (name === "cover_image") setCoverImage(URL.createObjectURL(webpFile));
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setImageLoading(false);
        }
    };

    useEffect(() => {
        if (userID && token) {
            fetchUserData();
        }
    }, [userID, token]);

    const [isLoading, setIsLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const validationSchema = Yup.object({
        userName: Yup.string().trim().required("الرجاء إدخال الاسم الكامل"),
        email: Yup.string().email("بريد إلكتروني غير صالح").required("الرجاء إدخال البريد الإلكتروني"),
        phone: Yup.string().required("رقم الجوال مطلوب")
            .matches(
                /^(05\d{8}|\+?9665\d{8})$/,
                "يرجى إدخال رقم جوال سعودي صالح يبدأ بـ 05 أو 9665"
            ),
    });

    // formik
    const formik = useFormik({
        initialValues: {
            userName: userData?.name || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
        },
        validationSchema,
        onSubmit: async (values) => {
            alert(values);
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = formik;
    const isModified =
        !userData?.name ||
        values.userName !== userData?.name ||
        values.email !== userData?.email ||
        values.phone !== userData?.phone;

    useEffect(() => {
        if (userData?.profile_image) {
            setProfileImage(`${userData?.profile_image}?t=${Date.now()}`);
            setCoverImage(`${userData?.cover_image}?t=${Date.now()}`);
        }
    }, [userData]);

    return (
        <section className='UserSettings_container'>
            <header className='userProfile_header'>
                <h2>الإعدادات</h2>
                <p>تحكم في حسابك وإعداداتك بسهولة من هنا</p>
            </header>

            <div className="userSettings_body">
                <div className="userSettings_body_header">
                    <ul className='userSettings_body_header_content'>
                        <li onClick={() => { setShowContent("profile") }} className={showContent === "profile" ? "active" : ""}><span>حسابي</span></li>
                        <li onClick={() => { setShowContent("location") }} className={showContent === "location" ? "active" : ""}><span>إضافة عنوان</span></li>
                        <li onClick={() => { setShowContent("privacy") }} className={showContent === "privacy" ? "active" : ""}><span>الخصوصية</span></li>
                        <li onClick={() => { setShowContent("deleteProfile") }} className={showContent === "deleteProfile" ? "active" : ""}><span>حذف الحساب</span></li>
                        <li onClick={() => { setShowContent("terms") }} className={showContent === "terms" ? "active" : ""}><span>الشروط والأحكام</span></li>
                    </ul>
                </div>

                <div className="userSettings_body_container">
                    {showContent === "profile" && (
                        <>
                            <div className="user_data">
                                <div className="user_images">
                                    <div className="cover_user_image">
                                        {userData?.cover_image ?
                                            <img src={coverImage || userData?.cover_image} alt="img cover" loading='lazy' />
                                            :
                                            <svg className="skeleton-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                            </svg>
                                        }

                                        <label className="change_banner_btn">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageUpload(
                                                        e,
                                                        "cover_image",
                                                        `https://mashi.coderaeg.com/api/cover-image`
                                                    )
                                                }
                                                disabled={imageLoading}
                                            />
                                            <div className="change_banner_content">
                                                <div className="change_banner_icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera-icon lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /><circle cx={12} cy={13} r={3} /></svg>
                                                </div>
                                                <span> تغيير البانر</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="profile_user_image">
                                        <div className="user_img_container">
                                            {userData?.profile_image ?
                                                <img src={profileImage || userData?.profile_image} alt="img" loading="lazy" />
                                                :
                                                <svg className="skeleton-user-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                                </svg>
                                            }
                                            {imageLoading && (
                                                <div className="upload_overlay">
                                                    <div className="UploadImages_loader" />
                                                </div>
                                            )}
                                        </div>
                                        <label className="profile_camera_btn">
                                            <div className="profile_camera_icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera-icon lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /><circle cx={12} cy={13} r={3} /></svg>
                                            </div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageUpload(
                                                        e,
                                                        "profile_image",
                                                        `https://mashi.coderaeg.com/api/profile-image`
                                                    )
                                                }
                                                disabled={imageLoading}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="user_info">
                                    <h3 className="user_name">{userData?.user?.name?.split(" ").slice(0, 2).join(" ")}</h3>
                                </div>
                            </div>

                            <form className="Settings_user_form">
                                <div className="input_container">
                                    <label htmlFor="userName" className="input_label">
                                        <span>الاسم</span>
                                        {touched.userName && errors.userName && (
                                            <p className="error_message">{errors.userName}</p>
                                        )}
                                    </label>

                                    <div className="input_field">
                                        <input
                                            type="text"
                                            name="userName"
                                            id="userName"
                                            value={values.userName}
                                            onChange={(e) => setFieldValue("userName", e.target.value)}
                                            placeholder={userData?.name}
                                            disabled={!isEditMode}
                                            className={`input ${!isEditMode ? "readonly" : ""}`}
                                        />
                                    </div>
                                </div>

                                <div className="input_container">
                                    <label htmlFor="email" className="input_label">
                                        <span>بريدك الإكتروني</span>
                                        {touched.email && errors.email && (
                                            <p className="error_message">{errors.email}</p>
                                        )}
                                    </label>

                                    <div className="input_field">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                            placeholder={userData?.email}
                                            disabled={!isEditMode}
                                            className={`input ${!isEditMode ? "readonly" : ""}`}
                                        />
                                    </div>
                                </div>

                                <div className="input_container">
                                    <label htmlFor="phone" className="input_label">
                                        <span>رقم الجوال</span>
                                        {touched.phone && errors.phone && (
                                            <p className="error_message">{errors.phone}</p>
                                        )}
                                    </label>
                                    <div className="input_field">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={values.phone}
                                            onChange={(e) => setFieldValue("phone", e.target.value)}
                                            placeholder={userData?.phone}
                                            disabled={!isEditMode}
                                            className={`input ${!isEditMode ? "readonly" : ""}`}
                                        />
                                    </div>
                                </div>
                                {/* two buttons */}
                                <div className="two_buttons">
                                    {isEditMode && (
                                        <button
                                            type="button"
                                            className="cancel_button"
                                            onClick={() => {
                                                setFieldValue("useName", userData?.name || "");
                                                setFieldValue("email", userData?.email || "");
                                                setFieldValue("phone", userData?.phone || "");

                                                setIsEditMode(false);
                                            }}
                                        >
                                            الغاء
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="submit_btn"
                                        disabled={isLoading || (isEditMode && !isModified)}
                                        onClick={() => {
                                            if (!isEditMode) {
                                                setIsEditMode(true);
                                            } else {
                                                handleSubmit();
                                            }
                                        }}
                                    >
                                        {isLoading ? <div className="spinnerLoader" /> : isEditMode ? "حفظ" : "تعديل الملف الشخصي"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {showContent === "location" && (<LocationForm />)}
                    {showContent === "deleteProfile" && (<DeleteAcount />)}

                </div>
            </div>
        </section>
    )
};