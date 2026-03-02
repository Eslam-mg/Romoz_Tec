import { useEffect } from "react";

/**
* Custom hook: Dynamically adjusts the page title and meta description
* @param {string} title - Page title
* @param {string} description - Page description for SEO
*/

export default function useSEO(title, description) {
    useEffect(() => {
        const siteName = "ماشي";
        document.title = title ? `${title} | ${siteName}` : siteName;

        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement("meta");
                metaDesc.name = "description";
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute("content", description);
        }

        return () => {
            document.title = "ماشي";
        };
    }, [title, description]);
};