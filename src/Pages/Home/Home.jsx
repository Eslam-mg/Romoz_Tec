import React from "react";
import "./homeStyle.css";
import useSEO from "../../hooks/useSEO";
import Slider from '../../Components/HomeComponent/Slider/Slider';
import BlogCard from "../../Components/HomeComponent/BlogCard/BlogCard";
import SellSeaction from "../../Components/HomeComponent/SellSeaction/SellSeaction";
import CategoriesSection from "../../Components/HomeComponent/CategoriesSection/CategoriesSection";

const Home = () => {
  useSEO("منصة إعلانات", "موقع ماشي للإعلانات – بيع وشراء السيارات، العقارات، الجوالات والإلكترونيات بسهولة وأمان.");
  const card = [
    {
      id: 1,
      img: "/Icons/whiteCara.svg",
      title: "سهل وسريع",
      desc: "اضف إعلانك في أقل من دقيقة واحدة",
    },
    {
      id: 2,
      img: "/Icons/whiteShield.svg",
      title: "آمن وموثوق",
      desc: "نضمن لك تجربة آمنة مع أفضل المشتريين والبائعين",
    },
    {
      id: 3,
      img: "/Icons/whiteDoller.svg",
      title: "إضافة مجانية",
      desc: "انشر إعلانك مجانًا ووصل إلى آلاف المهتمين",
    },
  ];
  return (
    <main className="home-container">
      <section className="search-par">
        <div className="overlay">
          <div className="search-par-container">
            <div className="search-par-text">
              <h1>كل ما تحتاجه في مكان واحد</h1>
              <p>
                اعرض منتجاتك أو ابحث عن أفضل العروض بالقرب منك.. بكل سرعة وأمان{" "}
              </p>
            </div>
            <form className="search-par-search">
              <div className="search-par-content">
                <label>الكلمات المفتاحيه</label>
                <input type="search" placeholder="ابحث عن..." />
              </div>
              <div className="search-par-content">
                <label>الموقع</label> <input type="search" placeholder="اين" />
              </div>
              <div className="search-par-content">
                <label>القسم</label> <input type="search" placeholder="في قسم" />
              </div>
              <button className="btn-search-par">بحث...</button>
            </form>
          </div>
        </div>
      </section>

      <Slider />

      <section className="add-list">
        <h1 className="add-list-title">
          لماذا تختار <span>ماشي؟</span>
        </h1>
        <p>منصتك المثالية للبيع والشراء بكل ثقة وأمان</p>
        <div className="add-list-container">
          {card.map((item) => (
            <div key={item.id} className="add-card">
              <div className="icon-box">
                <img src={item.img} alt={item.title} />
              </div>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <CategoriesSection />
      <BlogCard />
      <SellSeaction />
    </main>
  );
};
export default Home;
