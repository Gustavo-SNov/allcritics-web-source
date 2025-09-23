import {useContent} from "@/hooks/useContent";
import {useEffect} from "react";

import {Carousel} from "@/components/ui/carousel/Carousel";
import {CarouselVariant} from "@/types/Carousel";
import {CardVariant} from "@/types/Card";
import {CardAllCritics} from "@/components/features/cards/CardAllCritics";
import {ContentType} from "@/types/Content";


interface CarouselContentProps {
    carouselVariant: CarouselVariant;
    cardVariant: CardVariant;
    contentFilter?: {
        typeParam?: string;
        category?: string;
    };
    sizeParam?: number;
    sortParam?: string;
    title?: string;
    loop?: boolean;
    itemsPerPage?: number;
}

const ContentCarousel = ({
                             carouselVariant,
                             cardVariant,
                             contentFilter,
                             sizeParam = 10,
                             sortParam = 'releaseDate,desc',
                             title,
                             loop = false,
                             itemsPerPage
                         }: CarouselContentProps) => {
    const {contents, fetchContents} = useContent();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchContents({
                    contentType: ContentType[contentFilter?.typeParam?.toUpperCase() as keyof typeof ContentType],
                    category: contentFilter?.category,
                    page: 0,
                    size: sizeParam,
                    sort: sortParam,
                });
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Carousel
            variant={carouselVariant}
            title={title}
            loop={loop}
            itemsPerPage={itemsPerPage}
        >
            {contents.map((item) => (
                <CardAllCritics variant={cardVariant} key={item.idContent} content={item}/>
            ))}
        </Carousel>
    );
}

export default ContentCarousel;