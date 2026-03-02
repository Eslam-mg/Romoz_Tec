import { useEffect } from "react";

/**
* Custom hook: Closes the element when clicked outside of it
* @param {React.RefObject[]} refs - An array of ref objects representing the internal elements
* @param {boolean} active - Is the hook active?
* @param {Function} onOutsideClick - The function called when clicked outside of the elements
*/

export default function useOutsideClick(refs, active, onOutsideClick) {
    useEffect(() => {
        if (!active) return;

        const handleClickOutside = (e) => {
            const isInside = refs.some(
                (ref) => ref.current && ref.current.contains(e.target)
            );
            if (!isInside) {
                onOutsideClick();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [refs, active, onOutsideClick]);
}
