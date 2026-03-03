import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categories } from "../Advertisements/Category/Category";
import { timeSince, handleWhatsApp } from "../../utils/helpers";
import { attributeMapForDetails } from "../../data";
import { fetchAdDetails } from "../../services/adsService";
import { STORAGE_URL } from "../../services/api";
import useSEO from "../../hooks/useSEO";
import "./detailsLayoutStyle.css";

export default function DetailsLayout() {
  const [loginModel, setLoginModel] = useState(false);
  const { details, id } = useParams();
  const category = categories.find((cat) => details === cat.key) || { name: "اسم الفئة", key: "" };

  const [isLoading, setIsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [ad_details, setAd_details] = useState({});
  const images = ad_details?.images || [];
  const [mainImage, setMainImage] = useState(null);

  useSEO(
    ad_details?.information?.title || "تفاصيل الإعلان",
    `${ad_details?.information?.title || ""} - ${ad_details?.information?.description?.substring(0, 100) || ""}`
  );

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setDetailsError("")
      try {
        const response = await fetchAdDetails(details, id);
        if (response?.success) {
          const data = response.data;
          setAd_details(data);
          if (data?.images?.length > 0) {
            setMainImage(`${STORAGE_URL}/${data.images[0]}`);
          }
        }
      } catch (error) {
        console.error("Error fetching ad details:", error);
        setDetailsError(error)
      } finally {
        setIsLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [details, id]);

  useEffect(() => {
    document.body.style.overflow = loginModel ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [loginModel]);

  return (
    <section className="details-layout">
      <div className="details_header">
        {/* Breadcrumb */}
        <nav aria-label="مسار التنقل" className="details_links">
          <Link to="/" className="details-close">الرئيسيه</Link>
          <img src="/Icons/chevron-left.svg" alt="" aria-hidden="true" />
          <Link to={`/category/${category.key}`} className="details-close">{category.name}</Link>
          <img src="/Icons/chevron-left.svg" alt="" aria-hidden="true" />
          <span className="details-close">{ad_details?.information?.title}</span>
        </nav>

        <div className="details_header_content">
          <div className="details_header_title">
            <h1 className="details-title">{ad_details?.information?.title}</h1>
            <div className="details_price">
              {ad_details?.information?.price && (
                <>
                  <p className="details-left-price">{ad_details?.information?.price} ريال</p>
                  <span className="details-left-negotiable">
                    {ad_details?.information?.isNegotiable ? "قابل للتفاوض" : "غير قابل للتفاوض"}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="details-close-titles">
            <div className="special_star">
              <div className="special_star_icon"><img src="/Icons/star.svg" alt="" aria-hidden="true" /></div>
              <span>مميز</span>
            </div>
            <div className="Shield">
              <div className="Shield_icon"><img src="/Icons/Shield.svg" alt="" aria-hidden="true" /></div>
              <span>بائع موثوق</span>
            </div>
            <span className="details-close-title-empty">
              <span>نشر منذ </span>{ad_details?.created_at ? timeSince(ad_details.created_at) : ""}
            </span>
          </div>
        </div>
      </div>

      <section className="details_grid_container">
        {/* القسم الأيمن */}
        <div className="details-right">
          <div className="details_images">
            <div className="details-lay-image-main">
              {mainImage ? (
                <img src={mainImage} alt={ad_details?.information?.title || "صورة الإعلان"} />
              ) : (
                <p>جاري تحميل الصورة...</p>
              )}
            </div>
            <div className="details-lay-image-thumbs">
              {images.map((img, index) => {
                const fullImg = `${STORAGE_URL}/${img}`;
                return (
                  <img
                    key={index}
                    src={fullImg}
                    alt={`صورة ${index + 1}`}
                    loading="lazy"
                    onClick={() => setMainImage(fullImg)}
                    className={mainImage === fullImg ? "active-thumb" : ""}
                  />
                );
              })}
            </div>
          </div>

          {/* المواصفات */}
          <div className="details_specifications">
            <h2 className="details-lay-info-title">المواصفات</h2>
            <div className="details_specifications_box">
              <div className="attributes">
                {attributeMapForDetails(ad_details)[details]?.map((item, index) => (
                  <div className="attribute_item" key={index}>
                    <div className="attribute_item_icon"><img src={item.icon} alt="" aria-hidden="true" /></div>
                    <div className="attribute_item_text">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="deteils_location">
                {[{ label: "المنطقة", value: ad_details?.user?.area }, { label: "المدينة", value: ad_details?.user?.city }].map(({ label, value }) => (
                  <div className="deteils_location_item" key={label}>
                    <div className="location_item_icon"><img src="/Icons/location.svg" alt="" aria-hidden="true" /></div>
                    <div className="location_text">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الوصف */}
          <div className="details-layout-decs">
            <h2 className="details-lay-decs-title">الوصف</h2>
            <p className="details-lay-decs-info">{ad_details?.information?.description}</p>
            {ad_details?.attributes?.moreInfo && (
              <div className="attribute_item_text">
                <span>معلومات اضافية</span>
                <span>{ad_details?.attributes?.moreInfo}</span>
              </div>
            )}
          </div>
        </div>

        {/* القسم الأيسر */}
        <div className="details-left">
          <div className="details_left_container">
            <div className="details-left-top">
              <div className="details-left-top-user">
                <Link to={`/user/${ad_details?.seller?.name}/${ad_details?.user?.id_user}`} className="card_user">
                  <div className="card_user_image">
                    {ad_details?.user?.profile_image ? (
                      <img src={ad_details?.user?.profile_image} alt={ad_details?.seller?.name} />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx={12} cy={10} r={4} /><circle cx={12} cy={12} r={10} /></svg>
                    )}
                  </div>
                  <div className="user_info">
                    <div className="user_info_header">
                      <h2>{ad_details?.seller?.name}</h2>
                      <div className="Shield">
                        <div className="Shield_icon"><img src="/Icons/Shield.svg" alt="" aria-hidden="true" /></div>
                        <span>موثوق</span>
                      </div>
                    </div>
                    <p className="details-left-top-user-member">
                      <span>عضو منذ </span>
                      <span>{ad_details?.user?.account_created_at ? timeSince(ad_details?.user?.account_created_at) : ""}</span>
                    </p>
                  </div>
                </Link>

                <div className="details-left-top-user-actions">
                  <div className="rating_star">
                    <img src="/Icons/goldenStar.svg" alt="تقييم" />
                    <span>4.8</span>
                  </div>
                  <span>{ad_details?.user?.user_ads_count} اعلان</span>
                  <span>معدل الرد: 95%</span>
                </div>

                <div className="details-left-top-user-buttons">
                  {ad_details?.seller?.phoneMessage && (
                    <button type="button" className="details-left-top-user-btn1" onClick={() => setLoginModel(true)}>
                      <img src="/Icons/whitePhone.svg" alt="" aria-hidden="true" />
                      <span>تواصل</span>
                    </button>
                  )}
                  <button type="button" className="details-left-top-user-btn2">
                    <img src="/Icons/ChatTeardropDotsGreen.svg" alt="" aria-hidden="true" />
                    <span>رساله</span>
                  </button>
                </div>
              </div>

              {ad_details?.seller?.whatsAppMessage && (
                <button type="button" onClick={() => handleWhatsApp(ad_details?.seller, ad_details?.information?.title)} className="details-left-top-send">
                  واتساب
                </button>
              )}
            </div>

            {/* نصائح الأمان */}
            <div className="details-left-bottom">
              <h2 className="details-left-bottom-title">نصائح الامان</h2>
              <ul className="details-left-bottom-list">
                <li>تأكد من فحص السياره قبل الشراء.</li>
                <li>التق بالبائع في مكان عام.</li>
                <li>لا تدفع اي مبلغ قبل المعاينه.</li>
                <li>تحقق من الاوراق الرسميه.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal للتواصل */}
      {loginModel && (
        <section className="login_modal_fade" role="dialog" aria-modal="true" aria-label="التواصل مع العارض">
          <div className="modal_dialog">
            <div className="modal_header">
              <button type="button" onClick={() => setLoginModel(false)} aria-label="إغلاق">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="model_content">
              <p>التواصل مع العارض</p>
              <div className="seller_data">
                <a href={`tel:${ad_details?.seller?.phone}`} className="sellerPhone">
                  <div className="sellerPhone_svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>
                  </div>
                  <span className="call_link">{ad_details?.seller?.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};