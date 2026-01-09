import React, { useState, useEffect } from "react";
import "./blogCardStyle.css";
import AdCard from "../../AdCard/AdCard";
import SkeletonCard from "../../SkeletonCard/SkeletonCard";

export default function BlogCard() {
  const [adsCard, setAdsCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRandomEalans = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://mashi.coderaeg.com/api/ealans/random`);

        const data = await res.json();

        if (data?.success) {
          setAdsCard(data?.data?.data);
          setIsLoading(false);
          setErrorMessage("");
        } else {
          setErrorMessage("لم يتم العثور على إعلانات حالياً.");
        }
      } catch {
        setErrorMessage("حدث خطأ أثناء تحميل البيانات، حاول لاحقًا.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomEalans();
  }, []);

  return (
    <section className="car-card">
      {isLoading && <div className="isLoading">
        {Array.from({ length: 4 }, (_, i) => (<SkeletonCard key={i} />))}
      </div>}
      {errorMessage && (<p>{errorMessage}</p>)}
      {!isLoading && !errorMessage && (
        <div className="car_card_container">
          <h2 className="section-title">اكتشف الجديد أولًا</h2>
          <p className="section-subtitle">
            تصفح أحدث إعلانات السيارات المضافة الآن، واعثر على ما يناسبك بسرعة
            وسهولة
          </p>

          <div className="car-card-grid">
            {adsCard.length > 0 ? (
              adsCard.map((ad, index) => (
                <AdCard
                  key={index}
                  category={ad?.category}
                  adID={ad?.ad?.id_ads}
                  img={ad?.ad?.images[0]}
                  title={ad?.ad?.information?.title}
                  sellerName={ad?.ad?.seller?.name}
                  userID={ad?.ad?.user?.id_user}
                  showUserImg={true}
                  userImg={ad?.ad?.user?.profile_image}
                  area={ad?.ad?.user?.area}
                  created_at={ad?.ad?.created_at}
                  price={ad?.ad?.information?.price}
                />
              ))
            ) : (
              <p className="no-ads">لا توجد إعلانات حالياً</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};