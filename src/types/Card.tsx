import React from "react";
import {Content} from "@/types/Content";
import {ReviewProps} from "@/types/Review";

export type CardVariant = "hero" | "hover-card" | "review";

export interface CardProps {
    variant?: CardVariant;
    children?: React.ReactNode;
    content?: Content;
    review?: ReviewProps;
    key?: string | number;
}


