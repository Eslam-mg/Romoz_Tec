import React, { useEffect, useState } from "react";
import "./detailsLayout.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { categories } from "../Advertisements/Category/Category";
import { timeSince } from "../SpecificCategory/SpecificCategory";
import { attributeMapForDetails } from "../../data";

const DetailsLayout = () => {
  const [loginModel, setLoginModel] = useState(false);

  const { details, id } = useParams();
  const category = categories.find((cat) => details === cat.key) || "اسم الفئة";
  const [isLoading, setIsLoading] = useState(false);
  const [ad_details, setAd_details] = useState([]);

  const images = ad_details?.images || [];
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://mashi.coderaeg.com/api/ealans/${details}/${id}`
        );
        if (response?.data?.success) {
          const data = response?.data?.data;
          setAd_details(response?.data?.data);
          setIsLoading(false);

          if (data?.images?.length > 0) {
            setMainImage(`https://mashi.coderaeg.com/storage/${data.images[0]}`);
          }
        }
      } catch (error) {
        console.error("Error fetching ad details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [details, id]);

  useEffect(() => {
    if (loginModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loginModel]);

  return (
    <div className="details-layout">
      <div className="details_header">
        {/* links*/}
        <div className="details_links">
          <Link to="/" className="details-close">الرئيسيه</Link>
          <img src="/Icons/chevron-left.svg" alt="chevron-left" />
          <Link to={`/${category.key}`} className="details-close">{category.name}</Link>
          <img src="/Icons/chevron-left.svg" alt="chevron-left" />
          <span className="details-close">{ad_details?.information?.title}</span>
        </div>

        <div className="details_header_content">
          <div className="details_header_title">
            <h2 className="details-title">{ad_details?.information?.title}</h2>

            <div className="details_price">
              {ad_details?.information?.price &&
                <>
                  <h1 className="details-left-price">{ad_details?.information?.price} ريال</h1>
                  {ad_details?.information?.isNegotiable ?
                    <span className="details-left-negotiable"> قابل للتفاوض</span>
                    :
                    <span className="details-left-negotiable">غير قابل للتفاوض</span>
                  }
                </>
              }
            </div>
          </div>
          {/* info */}
          <div className="details-close-titles">
            <div className="special_star">
              <div className="special_star_icon">
                <img src="/Icons/star.svg" alt="Star" />
              </div>
              <span>مميز</span>
            </div>

            <div className="Shield">
              <div className="Shield_icon">
                <img src="/Icons/Shield.svg" alt="Shield" />
              </div>
              <span>بائع موثوق</span>
            </div>

            <span className="details-close-title-empty"><span>نشر منذ </span>{ad_details?.created_at ? timeSince(ad_details.created_at) : ""}</span>
          </div>
        </div>
      </div>

      <section className="details_grid_container">
        {/* ------------------- right section  ------------------- */}
        <div className="details-right">
          {/* main photo */}
          <div className="details_images">
            <div className="details-lay-image-main">
              {mainImage ? (
                <img src={mainImage} alt="Main" />
              ) : (
                <p>جاري تحميل الصورة...</p>
              )}
            </div>

            {/* small images */}
            <div className="details-lay-image-thumbs">
              {images.length > 0 &&
                images.map((img, index) => {
                  const fullImg = `https://mashi.coderaeg.com/storage/${img}`;
                  return (
                    <img
                      key={index}
                      src={fullImg}
                      alt={`thumb-${index}`}
                      onClick={() => setMainImage(fullImg)}
                      className={mainImage === fullImg ? "active-thumb" : ""}
                    />
                  );
                })}
            </div>
          </div>



          {/* المواصفات */}
          <div className="details_specifications">
            <h3 className="details-lay-info-title">المواصفات</h3>
            <div className="details_specifications_box">
              <div className="attributes">
                {attributeMapForDetails(ad_details)[details]?.map((item, index) => (
                  <div className="attribute_item" key={index}>
                    <div className="attribute_item_icon">
                      <img src={item.icon} alt={details} />
                    </div>
                    <div className="attribute_item_text">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="deteils_location">
                <div className="deteils_location_item">
                  <div className="location_item_icon">
                    <img src="/Icons/location.svg" alt="location" />
                  </div>
                  <div className="location_text">
                    <span>المنطقة</span>
                    <span>{ad_details?.user?.area}</span>
                  </div>
                </div>

                <div className="deteils_location_item">
                  <div className="location_item_icon">
                    <img src="/Icons/location.svg" alt="location" />
                  </div>
                  <div className="location_text">
                    <span>المدينة</span>
                    <span>{ad_details?.user?.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الوصف */}
          <div className="details-layout-decs">
            <h3 className="details-lay-decs-title">الوصف</h3>
            <p className="details-lay-decs-info">{ad_details?.information?.description}</p>
            {ad_details?.attributes?.moreInfo &&
              <div className="attribute_item_text">
                <span>معلومات اضافية</span>
                <span>{ad_details?.attributes?.moreInfo}</span>
              </div>
            }
          </div>
        </div>

        {/* ------------------- left section  ------------------- */}
        <div className="details-left">
          <div className="details_left_container">
            {/* معلومات البائع */}
            <div className="details-left-top">
              <div className="details-left-top-user">
                <Link to={`/user/${ad_details?.seller?.name}/${ad_details?.user?.id_user}`} className="card_user">
                  <div className="card_user_image">
                    {ad_details?.user?.profile_image ?
                      <img
                        src={ad_details?.user?.profile_image ? ad_details?.user?.profile_image : "/images/logo.svg"}
                        alt={ad_details?.seller?.name?.split(" ").map(word => word[0]).join(" ").toUpperCase()}
                      />
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx={12} cy={10} r={4} /><circle cx={12} cy={12} r={10} /></svg>
                    }
                  </div>

                  <div className="user_info">
                    <div className="user_info_header">
                      <h5>{ad_details?.seller?.name}</h5>
                      <div className="Shield">
                        <div className="Shield_icon">
                          <img src="/Icons/Shield.svg" alt="Shield" />
                        </div>
                        <span>موثوق</span>
                      </div>
                    </div>
                    <p className="details-left-top-user-member"><span>عضو منذ </span><span>{ad_details?.user?.account_created_at ? timeSince(ad_details?.user?.account_created_at) : ""}</span></p>
                  </div>
                </Link>

                {/* إحصائيات البائع */}
                <div className="details-left-top-user-actions">
                  <div className="rating_star">
                    <img src="/Icons/goldenStar.svg" alt="goldenStar" />
                    <span>4.8</span>
                  </div>
                  <span>{ad_details?.user?.user_ads_count} اعلان</span>
                  <span>معدل الرد: 95%</span>
                </div>

                {/* أزرار التواصل */}
                <div className="details-left-top-user-buttons">
                  {ad_details?.seller?.phoneMessage && (
                    <button className="details-left-top-user-btn1" onClick={() => setLoginModel(true)}>
                      <img src="/Icons/whitePhone.svg" alt="phone" />
                      <span>تواصل</span>
                    </button>
                  )}
                  <button className="details-left-top-user-btn2">
                    <img src="/Icons/ChatTeardropDotsGreen.svg" alt="ChatTeardropDotsGreen" />
                    <span>رساله</span>
                  </button>
                </div>
              </div>

              {ad_details?.seller?.whatsAppMessage && (
                <button type="button" onClick={() => handleWhatsApp(ad_details?.seller, ad_details?.information?.title)} className="details-left-top-send">واتساب</button>
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

      {/* <!----------- Modal -----------> */}
      {loginModel && (
        <section className="login_modal_fade">
          <div className="modal_dialog">
            <div className="modal_header">
              <button type="button" onClick={() => setLoginModel(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="model_content">
              <p>التواصل مع العارض</p>
              <div className="seller_data">
                <a href={`tel:${ad_details?.seller?.phone}`} className="sellerPhone">
                  <div className="sellerPhone_svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>
                  </div>
                  <span className="call_link">
                    {ad_details?.seller?.phone}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default DetailsLayout;

// handleWhatsApp function to open whatsapp
export function handleWhatsApp(seller, title) {
  if (!seller || !seller.phone) {
    console.error("Seller data not available");
    return;
  }

  let phone = seller.phone.trim().replace(/\s+/g, "").replace(/^\+/, "");
  phone = phone.startsWith("966") ? phone : phone.startsWith("0")
    ? `966${phone.slice(1)}`
    : `966${phone}`;

  if (!/^9665\d{8}$/.test(phone)) {
    return;
  }
  const message = `مرحبًا ${seller.name}! أريد التواصل معك بشأن إعلانك "${title}" على موقع ماشي.`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(waUrl, "_blank", "noopener,noreferrer");
}