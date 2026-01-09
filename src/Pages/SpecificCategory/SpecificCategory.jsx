import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { attributesMap, specificCategoriesData } from '../../data';
import SaudiRegionsDropdown from '../../Components/AdvertisementsComponents/SaudiRegionsDropdown/SaudiRegionsDropdown';
import SkeletonCard from '../../Components/SkeletonCard/SkeletonCard';
import NotFound from '../../Components/NotFound/NotFound';
import DatePicker from '../../Components/DatePicker/DatePicker';
import AdCard from '../../Components/AdCard/AdCard';
import "./specificCategoryStyle.css"

export default function SpecificCategory() {
    const { category } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const specificCate = specificCategoriesData.find((cat) => category === cat.key) || "اسم الفئة";

    // filtered type
    const [date, setDate] = useState("");
    const filteredCategoriesDataByDate = categoryData.filter((item) => {
        if (!date) return true;
        const itemDate = item.created_at.split(" ")[0];
        return itemDate === date;
    });

    const [filteredAttributes, setFilteredAttributes] = useState(null);
    const [attributeValue, setAttributeValue] = useState("");
    const filteredCategoriesData = filteredCategoriesDataByDate.filter((item) => {
        if (!filteredAttributes) return true;
        return item.attributes?.[filteredAttributes] === attributeValue;
    });

    const [region, setRegion] = useState("");
    const filteredCategoriesDataByregion = filteredCategoriesData.filter((item) => {
        if (!region || region === "كل المناطق") return true;
        return item?.user?.area === region;
    });

    const [city, setCity] = useState("");
    const filteredCategoriesDataByCity = filteredCategoriesDataByregion.filter((item) => {
        if (!city || city === "كل المدن") return true;
        return item?.user?.city === city;
    });

    // handle search bar
    const searchInputRef = useRef(null);
    const [searchInput, setSearchInput] = useState("");
    const handleSearchButton = () => {
        const value = searchInputRef.current.value.trim();
        setSearchInput(value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            const value = searchInputRef.current.value.trim();
            setSearchInput(value);
        }
    };

    // Filtered categories by search bar (case-insensitive)
    const filteredCategoriesDataByTitle = filteredCategoriesDataByCity.filter((item) => item?.information?.title?.toLowerCase().includes(searchInput.toLowerCase().trim()))
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCategoryData = async () => {
            setIsLoading(true);
            setErrorMessage(false);
            try {
                const response = await fetch(`https://mashi.coderaeg.com/api/ealans?category=${category}&per_page=20`);
                const data = await response.json();
                if (data.success) {
                    setCategoryData(data.data.data.ads);
                    setIsLoading(false);
                }
            } catch (error) {
                setErrorMessage(true);
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategoryData();
    }, [category]);
    return (
        <div className='categoryData_container'>
            {isLoading && (
                <div className='isLoading'>{Array.from({ length: 4 }, (_, i) => (<SkeletonCard key={i} />))}</div>
            )}
            {errorMessage && <NotFound />}
            {!isLoading && !errorMessage && (
                <>
                    <section className='top_section'>
                        <div className="top_section_container">
                            <div className="categoryData_links">
                                <Link to="/" className="main_link">الرئيسيه </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                                <span className="category_link">{specificCate?.title}</span>
                            </div>

                            <div className="categoryData_header">
                                <h2>{specificCate?.title}</h2>
                                <p>{specificCate?.desc}</p>
                                <div className="search_input">
                                    <input
                                        type="search"
                                        name="searchByTitle"
                                        ref={searchInputRef}
                                        onKeyDown={handleSearchKeyDown}
                                        id="searchByTitle"
                                        placeholder={specificCate.search}
                                    />
                                    <button type='button' onClick={handleSearchButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx={11} cy={11} r={8} /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="attributes_map">
                                <button
                                    className={!filteredAttributes ? "attri_btn_active" : ""}
                                    onClick={() => {
                                        setFilteredAttributes(null);
                                        setAttributeValue("");
                                    }}
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

                    <section className='bottom_section_categoryData'>
                        <div className="bottom_section_categoryData_header">
                            <div className="">وجدنا لك {filteredCategoriesDataByTitle?.length} خيارًا</div>
                            <div className=""></div>
                        </div>
                        <div className="categories_items">
                            {filteredCategoriesDataByTitle.map((cat, index) => (
                                <div key={index}>
                                    <AdCard category={category} adID={cat?.id_ads} img={cat.images[0]} title={cat?.information?.title} sellerName={cat.seller?.name} userID={cat?.user?.id_user} userImg={cat?.user?.profile_image} area={cat?.user?.area} created_at={cat?.created_at} price={cat?.information?.price}/>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    )
};

function toArabicNumbers(number) {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number.toString().split("").map(d => arabicNumbers[d] || d).join("");
}

export function timeSince(dateString) {
    const now = new Date();
    const past = new Date(dateString.replace(" ", "T"));
    const dateOnly = dateString.split(" ")[0];
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 3) return dateOnly;
    if (days > 0) return `${toArabicNumbers(days)} يوم`;
    if (hours > 0) return `${toArabicNumbers(hours)} ساعة`;
    if (minutes > 0) return `${toArabicNumbers(minutes)} دقيقة`;
    return `${toArabicNumbers(seconds)} ثانية`;
}