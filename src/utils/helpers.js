/**
 * Format large price numbers into readable Arabic format
 * Examples:
*/
export function formatPrice(price) {
    const num = Number(price);

    if (!num) return "غير محدد";

    const format = (value, label) => {
        const formatted =
            value % 1 === 0 ? value.toString() : value.toFixed(1).replace(".", ",");
        return `${formatted} ${label}`;
    };

    if (num >= 1_000_000_000) {
        return format(num / 1_000_000_000, "مليار");
    }

    if (num >= 1_000_000) {
        return format(num / 1_000_000, "مليون");
    }

    return num.toString();
}

/**
* Converting numbers to Arabic
*/
function toArabicNumbers(number) {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number.toString().split("").map((d) => arabicNumbers[d] || d).join("");
}

/**
* Calculating time elapsed since a specific date
*/
export function timeSince(dateString) {
    if (!dateString) return "";
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

/**
* Open a WhatsApp chat with the seller
*/
export function handleWhatsApp(seller, title) {
    if (!seller?.phone) return;

    let phone = seller.phone.trim().replace(/\s+/g, "").replace(/^\+/, "");
    phone = phone.startsWith("966")
        ? phone
        : phone.startsWith("0")
            ? `966${phone.slice(1)}`
            : `966${phone}`;

    if (!/^9665\d{8}$/.test(phone)) return;

    const message = `مرحبًا ${seller.name}! أريد التواصل معك بشأن إعلانك "${title}" على موقع ماشي.`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
}

/**
* Username abbreviation (first two words)
*/
export function getShortName(fullName, wordCount = 2) {
    if (!fullName) return "";
    return fullName.split(" ").slice(0, wordCount).join(" ");
}

/**
* Extracting initial characters from a username
*/
export function getInitials(fullName) {
    if (!fullName) return "";
    return fullName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}
