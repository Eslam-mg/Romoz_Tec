import React from "react";
import "./contactUsStyle.css";
import useSEO from "../../hooks/useSEO";
import { EmailIcon, PhoneIcon, UserIcon } from "../../Components/UI/Icons/Icons";

const ContactUs = () => {
  useSEO("تواصل معانا", "نرحب بتواصلك معنا لأي استفسار أو ملاحظة، فريقنا جاهز لمساعدتك.");
  return (
    <section className="contact-us">
      <h2 className="contact_title">اتصل بنا</h2>
      <p className="contact_description">
        نرحب بتواصلك معنا لأي استفسار أو ملاحظة، فريقنا جاهز لمساعدتك.{" "}
      </p>
      <div className="contact_us_container">
        {/* Right Section - Communication Form */}
        <div className="contact_us_container_right">
          <div className="contact_us_container_right_content">
            <div className="contact_us_container_right_icon"><img src="/Icons/ChatTeardrop.svg" alt="chat" /></div>

            <h3 className="contact_us_container_right_title">
              ارسل لنا رسالة:
            </h3>
          </div>

          {/* Communication Model */}
          <form className="contact_us_form">
            {/* full name */}
            <div className="input_container">
              <label htmlFor="name" className="input_label">
                <span>الاسم الكامل</span>
              </label>
              <div className="input_field">
                <input type="text" name="name" id="name" className="input" placeholder="ادخل اسمك الكامل" />
                <UserIcon width={24} height={24} className="input_icon" />
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="input_container">
              <label htmlFor="email" className="input_label">
                <span>بريدك الإلكتروني</span>
              </label>
              <div className="input_field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="بريدك الإلكتروني"
                  autoComplete="email"
                />
                <EmailIcon width={24} height={24} className="input_icon" />
              </div>
            </div>

            {/* رقم الجوال */}
            <div className="input_container">
              <label htmlFor="phone" className="input_label">
                <span>رقم الجوال</span>
              </label>
              <div className="input_field">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input"
                  placeholder="ادخل رقم جوالك"
                />
                <PhoneIcon width={24} height={24} className="input_icon" />
              </div>
            </div>

            {/* الرسالة */}
            <div className="input_container">
              <label htmlFor="message" className="input_label">رسالتك</label>
              <div className="input_field">
                <textarea className="contact_us_textarea" placeholder="اكتب رسالتك هنا..." />
              </div>
            </div>

            {/* زر إرسال */}
            <button type="submit" className="contact_us_btn">
              <img src="/Icons/PaperPlaneRight.svg" alt="PaperPlaneRight" className="btn-icon" />
              إرسال رسالتك
            </button>
          </form>
        </div>

        {/* Left section - Contact information */}
        <div className="contact_us_container_left">
          <div className="contact_us_container_left_content">
            {/* Direct contact information */}
            <div className="contact_us_container_left_top">
              <h1>تواصل معنا مباشرة:</h1>
              <div>
                <p> البريد الإلكتروني</p>
                <span>
                  <EmailIcon width={24} height={24} className="contact_us_container_left_icon" />
                  <a href="mailto:support@mashee.com">support@mashee.com</a>
                </span>
              </div>
              <div>
                <p>خدمة العملاء</p>
                <span>
                  <PhoneIcon width={24} height={24} className="contact_us_container_left_icon" />
                  <a href="#">متاح من 9 صباحًا إلى 6 مساءً</a>
                </span>
              </div>
            </div>

            {/* روابط السوشيال ميديا */}
            <div className="contact_us_container_left_bottom">
              <h1>تابعنا على:</h1>
              <div className="contact_us_container_left_bottom_icons">
                <div>
                  <img src="/Icons/facebook.svg" alt="facebook" className="contact_us_container_left_icon" />
                </div>
                <div>
                  <img src="/Icons/instegram.svg" alt="instegram" className="contact_us_container_left_icon" />
                </div>
                <div>
                  <img src="/Icons/linkedIn.svg" alt="linkedIn" className="contact_us_container_left_icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactUs;