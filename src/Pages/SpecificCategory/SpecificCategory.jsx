import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { attributesMap, specificCategoriesData } from '../../data';
import SaudiRegionsDropdown from '../../Components/AdvertisementsComponents/SaudiRegionsDropdown/SaudiRegionsDropdown';
import SkeletonCard from '../../Components/SkeletonCard/SkeletonCard';
import NotFound from '../../Components/NotFound/NotFound';
import DatePicker from '../../Components/DatePicker/DatePicker';
import AdCard from '../../Components/AdCard/AdCard';
import { fetchAdsByCategory } from '../../services/adsService';
import useSEO from '../../hooks/useSEO';
import "./specificCategoryStyle.css";

export default function SpecificCategory() {
    const { category } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const specificCate = specificCategoriesData.find((cat) => category === cat.key) || { title: "اسم الفئة", desc: "", search: "ابحث..." };

    useSEO(
        `${specificCate?.title || "تصفح الإعلانات"}`,
        `تصفح إعلانات ${specificCate?.title || ""} على منصة ماشي. جد أفضل العروض بالقرب منك.`
    );

    // الفلاتر
    const [date, setDate] = useState("");
    const [filteredAttributes, setFilteredAttributes] = useState(null);
    const [attributeValue, setAttributeValue] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");

    // البحث النصي
    const searchInputRef = useRef(null);
    const [searchInput, setSearchInput] = useState("");

    const handleSearchButton = () => {
        setSearchInput(searchInputRef.current.value.trim());
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") setSearchInput(searchInputRef.current.value.trim());
    };

    // تطبيق الفلاتر المتسلسلة
    const filteredData = categoryData
        .filter((item) => !date || item.created_at.split(" ")[0] === date)
        .filter((item) => !filteredAttributes || item.attributes?.[filteredAttributes] === attributeValue)
        .filter((item) => !region || region === "كل المناطق" || item?.user?.area === region)
        .filter((item) => !city || city === "كل المدن" || item?.user?.city === city)
        .filter((item) => item?.information?.title?.toLowerCase().includes(searchInput.toLowerCase()));

    useEffect(() => {
        window.scrollTo(0, 0);
        const load = async () => {
            setIsLoading(true);
            setErrorMessage(false);
            try {
                const data = await fetchAdsByCategory(category);
                if (data.success) setCategoryData(data.data.data.ads);
            } catch {
                setErrorMessage(true);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [category]);

    return (
        <div className="categoryData_container">
            {isLoading && (
                <div className="isLoading">
                    {Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)}
                </div>
            )}
            {errorMessage && <NotFound />}
            {!isLoading && !errorMessage && (
                <>
                    <section className="top_section">
                        <div className="top_section_container">
                            {/* breadcrumb */}
                            <nav aria-label="مسار التنقل" className="categoryData_links">
                                <Link to="/" className="main_link">الرئيسيه</Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                                <span className="category_link">{specificCate?.title}</span>
                            </nav>

                            <div className="categoryData_header">
                                <h1>{specificCate?.title}</h1>
                                <p>{specificCate?.desc}</p>
                                <div className="search_input">
                                    <label htmlFor="searchByTitle" className="sr-only">بحث</label>
                                    <input
                                        type="search"
                                        name="searchByTitle"
                                        id="searchByTitle"
                                        ref={searchInputRef}
                                        onKeyDown={handleSearchKeyDown}
                                        placeholder={specificCate.search}
                                        aria-label={`البحث في ${specificCate?.title}`}
                                    />
                                    <button type="button" onClick={handleSearchButton} aria-label="بحث">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx={11} cy={11} r={8} /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="attributes_map" role="group" aria-label="فلتر حسب النوع">
                                <button
                                    className={!filteredAttributes ? "attri_btn_active" : ""}
                                    onClick={() => { setFilteredAttributes(null); setAttributeValue(""); }}
                                >
                                    عرض الكل
                                </button>
                                {attributesMap[category]?.data?.map((item, index) => (
                                    <button
                                        key={index}
                                        className={filteredAttributes === attributesMap[category].key && attributeValue === item ? "attri_btn_active" : ""}
                                        onClick={() => { setFilteredAttributes(attributesMap[category].key); setAttributeValue(item); }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="data_Region">
                                <SaudiRegionsDropdown setRegion={setRegion} setCity={setCity} />
                                <div className="date-picker">
                                    <DatePicker onChange={(value) => setDate(value)} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bottom_section_categoryData">
                        <div className="bottom_section_categoryData_header">
                            <div>وجدنا لك {filteredData?.length} خيارًا</div>
                        </div>
                        <div className="categories_items">
                            {filteredData.map((cat) => (
                                <AdCard
                                    key={cat?.id_ads}
                                    category={category}
                                    adID={cat?.id_ads}
                                    img={cat.images[0]}
                                    title={cat?.information?.title}
                                    sellerName={cat.seller?.name}
                                    userID={cat?.user?.id_user}
                                    userImg={cat?.user?.profile_image}
                                    area={cat?.user?.area}
                                    created_at={cat?.created_at}
                                    price={cat?.information?.price}
                                />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};