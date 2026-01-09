import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./locationFormStyle.css";
import { contextData } from '../../Context/Context';
import { saudiRegions } from '../../data';

export default function LocationForm() {
    const { userID, token, fetchUserData, userData } = useContext(contextData);
    const [isLoading, setIsLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const areaInputRef = useRef(null);
    const RegionDropdownRef = useRef(null);
    const cityDropdownRef = useRef(null);

    const [isOpenRegion, setIsOpenRegion] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            location: userData?.location || "",
            area: userData?.area || "",
            city: userData?.city || "",
        },
        validationSchema: Yup.object({
            location: Yup.string().required("العنوان بالتفصيل مطلوب").min(5, "العنوان قصير جدًا"),
            area: Yup.string().required("المنطقة مطلوبة"),
            city: Yup.string().required("المدينة مطلوبة"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            if (!isEditMode) return;
            setIsLoading(true);
            setServerMessage(null);

            try {
                const res = await axios.post(`https://mashi.coderaeg.com/api/complete-location`,
                    values,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setServerMessage("تم حفظ الموقع بنجاح!");
                setIsEditMode(false);
            } catch (err) {
                setServerMessage(err.response?.data?.message || "حدث خطأ أثناء حفظ الموقع");
            } finally {
                setIsLoading(false);
                setSubmitting(false);
            }
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = formik;

    const selectedRegion = saudiRegions.find((r) => r.region === values.area);
    const filteredRegions = saudiRegions.filter((r) => r.region.includes(values.area));
    const filteredCities = selectedRegion?.cities.filter((c) => c.includes(values.city)) || [];

    // الزرار يشتغل بس لو البيانات اتغيرت
    const isModified =
        !userData?.area ||
        values.area !== userData?.area ||
        values.city !== userData?.city ||
        values.location !== userData?.location;

    useEffect(() => {
        const closeDropdowns = (e) => {
            if (RegionDropdownRef.current && !RegionDropdownRef.current.contains(e.target))
                setIsOpenRegion(false);
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target))
                setIsOpenCity(false);
        };
        document.addEventListener("mousedown", closeDropdowns);
        return () => document.removeEventListener("mousedown", closeDropdowns);
    }, []);

    const handleSelectRegion = (region) => {
        setFieldValue("area", region);
        setFieldValue("city", "");
        setIsOpenRegion(false);
    };
    const handleSelectCity = (city) => {
        setFieldValue("city", city);
        setIsOpenCity(false);
    };

    return (
        <form className="location_container" onSubmit={(e) => e.preventDefault()}>
            <div className="location_header">
                <h3>الموقع</h3>
            </div>

            <div className="inputs_group">
                {/* area */}
                <div className="input_container">
                    <header className="input_label">
                        <span>المنطقة*</span>
                        {errors.area && touched.area && isEditMode && <div className="info_error">{errors.area}</div>}
                    </header>
                    <div className="input_field" ref={RegionDropdownRef}>
                        <input
                            ref={areaInputRef}
                            type="text"
                            name="area"
                            id="area"
                            value={values.area}
                            onClick={() => isEditMode && setIsOpenRegion(true)}
                            onChange={(e) => setFieldValue("area", e.target.value)}
                            placeholder={userData?.area ? "" : "اختر المنطقة"}
                            disabled={!isEditMode}
                            className={`input ${!isEditMode ? "readonly" : ""}`}
                        />
                        <div className="arrow_up">
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`${isOpenRegion ? "open" : ""}`}><path d="m18 15-6-6-6 6" /></svg>
                        </div>
                        {isOpenRegion && (
                            <ul className="region_option">
                                {filteredRegions.map((region) => (
                                    <li key={region.id} onClick={() => handleSelectRegion(region.region)}>
                                        {region.region}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* city */}
                <div className="input_container">
                    <header className="input_label">
                        <span>المدينة*</span>
                        {errors.city && touched.city && isEditMode && <div className="info_error">{errors.city}</div>}
                    </header>
                    <div className="input_field" ref={cityDropdownRef}>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={values.city}
                            onClick={() => isEditMode && setIsOpenCity(true)}
                            onChange={(e) => setFieldValue("city", e.target.value)}
                            placeholder={userData?.city ? "" : "اختر المدينة"}
                            disabled={!isEditMode}
                            className={`input ${!isEditMode ? "readonly" : ""}`}
                        />
                        <div className="arrow_up">
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`${isOpenCity ? "open" : ""}`}><path d="m18 15-6-6-6 6" /></svg>
                        </div>
                        {isOpenCity && values.area && (
                            <ul className="city_option">
                                {filteredCities.map((city, i) => (
                                    <li key={i} onClick={() => handleSelectCity(city)}>
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* location */}
                <div className="input_container">
                    <header className="input_label">
                        <span>العنوان بالتفصيل*</span>
                        {errors.location && touched.location && isEditMode && (
                            <div className="info_error">{errors.location}</div>
                        )}
                    </header>
                    <div className="input_field">
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={userData?.location ? "" : "المنطقة - المدينة - الحي - الشارع"}
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
                                setFieldValue("area", userData?.area || "");
                                setFieldValue("city", userData?.city || "");
                                setFieldValue("location", userData?.location || "");

                                setIsEditMode(false);

                                // close any Dropdown 
                                setIsOpenRegion(false);
                                setIsOpenCity(false);
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
                                setTimeout(() => areaInputRef.current?.focus(), 0);
                            } else {
                                handleSubmit();
                            }
                        }}
                    >
                        {isLoading ? <div className="spinnerLoader" /> : isEditMode ? "حفظ" : (!userData?.area ? "أضف عنوان" : "تعديل")}
                    </button>
                </div>
            </div>

            {serverMessage && <p className="server_message">{serverMessage}</p>}
        </form>
    );
};