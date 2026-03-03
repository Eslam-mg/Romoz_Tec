import React, { useEffect } from "react";
import "./toastWarningStyle.css";

/**
 * مكوّن تنبيه تحذيري يظهر لمدة 3 ثوانٍ ثم يختفي
 * @param {string} message - نص الرسالة
 * @param {Function} onClose - دالة الإغلاق
 */
export default function ToastWarning({
    message = "الرجاء إضافة الموقع قبل المتابعة.",
    onClose,
}) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div id="toast-warning" role="alert" aria-live="assertive" className="toast_warning">
            <div className="toast_container">
                <div className="toast-icon">
                    <svg className="toast-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                    </svg>
                </div>

                <div className="toast-message">{message}</div>

                <button type="button" className="toast-close-btn" aria-label="إغلاق التنبيه" onClick={onClose}>
                    <svg className="toast-close-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>

                <div className="progress-line" />
            </div>
        </div>
    );
};