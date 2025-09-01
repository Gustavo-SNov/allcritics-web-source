
import {useCallback, useState} from "react";


export const useCard = () => {
    const [hoveredItem, setHoveredItem] = useState<number | string | null>(null);

    const handleHover = useCallback((idItem: string | number | null) => setHoveredItem(idItem), []);

    return {
        hoveredItem,
        handleHover
    };
}