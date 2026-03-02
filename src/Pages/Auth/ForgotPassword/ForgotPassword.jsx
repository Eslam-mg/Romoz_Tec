import React from 'react'
import { Link } from "react-router-dom";
import "./forgotPasswordStyle.css";
import { EmailIcon } from '../../../Components/UI/Icons/Icons';

export default function ForgotPassword() {
  return (
    <div className="forgotPassword-wrapper">
      <div className="top_line" />
      <div className="forgotPassword-container">
        <header className='forgotPassword_header'>
          <div className="header_icon">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x={2} y={4} width={20} height={16} rx={2} /></svg>
          </div>
          <h2>أدخل بريدك الإلكتروني</h2>
        </header>

        <div className="forgotPassword-box">
          <p>
            "رجاءً أدخل بريدك الإلكتروني المسجّل لتلقي رمز التحقق واستعادة كلمة المرور بسهولة"
          </p>
        </div>
        <form className="forgotPassword_form">
          <div className="input_container">
            <header className="input_label">
              <span>بريدك الإلكتروني</span>
            </header>

            <div className="input_field">
              <input
                type="email"
                name="email"
                id="email"
                className='input'
                placeholder='أدخل بريدك الإلكتروني'
              />
              <EmailIcon width={22} height={22} className='input_icon'/>
            </div>
          </div>

          <button className="forgotPassword_button">
            إرسال الرمز
          </button>
        </form>
      </div>
    </div>
  )
}