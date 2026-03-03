import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from "../../hooks/useSEO";
import "./aboutUsStyle.css";
import { CarsIcon, DevicesIcon, JobsIcon, RealEstateIcon, WebcamIcon, EyeIcon, HeartIcon } from '../../Components/UI/Icons/Icons';

export default function AboutUS() {
    useSEO("من نحن", "ماشي منصه إعلانات مبتكرة تربطك بكل ما تحتاجه في مكان واحد ، سواء إن كنت تريد بيع سيارتك ، تقوم بعرض عقارات ، شراء إلكترونيات ، أو حتي تبحث عن منتجات متنوعه . تجدها كلها بسهوله وسرعه وبأعلي درجات الأمان.");
    const data = [
        {
            id: 1,
            image: "./images/team.webp",
            icon: WebcamIcon,
            title: "هدفنا",
            desc: "توصيل البائع بالمشتري بسرعة وأمانة",
        },
        {
            id: 2,
            image: "./images/team1.webp",
            icon: EyeIcon,
            title: "رؤيتنا",
            desc: "توفير بيئة آمنة وموثوقة للتجارة",
        },
        {
            id: 3,
            image: "./images/team2.webp",
            icon: HeartIcon,
            title: "قيمنا",
            desc: "الشفافية، الثقة، والمصداقية",
        },
    ];

    const firstSection = [
        { icon: "./Icons/aboutUs/sereach.svg", title: "ابحث عن ما تحتاجه", desc: "استخدم البحث المقدم للعثور على المنتج المطلوب بسرعة وسهولة" },
        { icon: "./Icons/aboutUs/ChatTeardrop.svg", title: "تواصل مع البائع", desc: "تحدث مع البائع مباشرة للاستفسار عن التفاصيل والتفاوض على السعر" },
        { icon: "./Icons/aboutUs/Handshake.svg", title: "أكمل الصفقة بأمان", desc: "اتفق على التفاصيل النهائية وأتمم عملية الشراء بكل ثقة وأمان" },
    ];

    const secondSection = [
        { icon: "./Icons/aboutUs/TrendUp.svg", title: "إضافة مجانية", desc: "انشر إعلانك مجاناً ووصل إلى آلاف المهتمين" },
        { icon: "./Icons/aboutUs/child.svg", title: "آمن وموثوق", desc: "نضمن لك تجربة آمنة مع أفضل المشترين والبائعين" },
        { icon: "./Icons/aboutUs/doller.svg", title: "سهل وسريع", desc: "أضف إعلانك في أقل من دقيقة واحدة" },
    ];
    const Card = ({ icon, title, desc }) => (
        <div className="AboutUsWork_card">
            <div className="card_icon">
                <img src={icon} alt={title} className="img_icon" />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
    return (
        <section>
            <div className="aboutUsLayout">
                <div className="aboutUsLayout_landing">
                    <h1>من نحن؟</h1>
                    <p>
                        ماشي منصه إعلانات مبتكرة تربطك بكل ما تحتاجه في مكان واحد ، سواء إن كنت تريد بيع سيارتك ، تقوم بعرض عقارات ، شراء إلكترونيات ، أو حتي تبحث عن منتجات متنوعه ..
                        تجدها كلها بسهوله وسرعه وبأعلي درجات الأمان.
                    </p>
                    <button className="aboutUsLayout_btn"> <Link to="/">ابدأ الآن</Link></button>
                </div>
            </div>

            {/* ------------------ aboutUsPlatform ------------------ */}
            <div className="aboutUsPlatform">
                {/* القسم الأيمن */}
                <div className="aboutUsPlatform_right">
                    <h2 className="aboutUsPlatform_right_heading">منصه ماشي</h2>
                    <p className="aboutUsPlatform_right_para">
                        ماشي هو منصّة إعلانات مبوّبة مبتكرة، تساعدك على بيع منتجاتك أو شراء ما
                        تحتاجه في دقائق.
                    </p>
                    <div className="aboutUsPlatform_categories_container">
                        {/* أيقونات الفئات */}
                        <div className="aboutUsPlatform_category">
                            <RealEstateIcon width={20} height={20} className='aboutUsPlatform_category_icon' />
                            <span className="aboutUsPlatform_line_text_real_estate">عقارات</span>
                        </div>

                        <div className="aboutUsPlatform_category">
                            <CarsIcon width={20} height={20} className='aboutUsPlatform_category_grayIcon' />
                            <span className="aboutUsPlatform_line_text_car">سيارات</span>
                        </div>

                        <div className="aboutUsPlatform_category">
                            <DevicesIcon width={20} height={20} className='aboutUsPlatform_category_icon' />
                            <span className="aboutUsPlatform_line_text_devices">الأجهزة</span>
                        </div>

                        <div className="aboutUsPlatform_category">
                            <JobsIcon width={20} height={20} className='aboutUsPlatform_category_grayIcon' />
                            <span className="aboutUsPlatform_line_text_jobs">الوظائف</span>
                        </div>
                    </div>
                </div>

                {/* القسم الأيسر */}
                <div className="aboutUsPlatform_left">
                    <div className="aboutUsPlatform_left_avatar">
                        <img src="./images/platform.webp" alt="منصة ماشي" className="avatar_img" />
                    </div>

                    <div className="aboutUsPlatform_left_avatar_icon">
                        <img src="./Icons/aboutUs/DeviceMobileCamera.svg" alt="DeviceMobileCamera" />
                    </div>
                </div>
            </div>

            {/* ------------------ aboutUsTeam ------------------ */}
            <div className="aboutUsTeam">
                <h2 className="aboutUsTeam_title">هدفنا ورؤيتنا وقيمنا</h2>
                <div className="aboutUsTeam_container">
                    {data.map((item) => {
                        const Icon = item.icon
                        return (
                            <div className="aboutUsTeam_box" key={item.id}>
                                <img src={`${item.image}`} alt={item.title} />
                                <div className="aboutUsTeam_overlay">
                                    <Icon width={36} height={36} className='aboutUsTeam_icon' />
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ------------------ AboutUsWork ------------------ */}
            <div className="AboutUsWork_container">
                <div className="howItWork">
                    <div className="howItWork_container">
                        <h2 className="section-title">كيف يعمل <span>ماشي؟</span></h2>
                        <div className="cards-grid">
                            {firstSection.map((item, i) => <Card key={i} {...item} />)}
                        </div>
                    </div>
                </div>

                <div className="choose_container">
                    <h2 className="section-title">لماذا تختار <span>ماشي؟</span></h2>
                    <p className="subtitle">منصتك المثالية للبيع والشراء بكل ثقة وأمان</p>
                    <div className="cards-grid">
                        {secondSection.map((item, i) => <Card key={i} {...item} />)}
                    </div>
                </div>
            </div>

            {/* ------------------ AboutUsChoice ------------------ */}
            <div className="auc_container">
                <h2>
                    انضم إلى آلاف المستخدمين وابدأ بيع <br />
                    <span>وشراء ما تريد الآن!</span>
                </h2>
                <p>اكتشف عالماً من الفرص والعروض المميزة في انتظارك</p>
                <button className="auc_btn">
                    <span>ابدأ باستخدام ماشي</span>
                    <div className="left_arrow">
                        <img src="./Icons/aboutUs/ArrowLeft.svg" alt="ArrowLeft" />
                    </div>
                </button>
            </div>
        </section>
    )
};