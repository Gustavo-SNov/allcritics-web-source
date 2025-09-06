import {useContent} from "@/hooks/useContent";
import {useEffect} from "react";
import {ContentType} from "@/types/Content";
import {Carousel} from "@/components/ui/carousel/Carousel";
import {CarouselVariant} from "@/types/Carousel";
import {CardVariant} from "@/types/Card";
import {CardAllCritics} from "@/components/features/cards/CardAllCritics";

interface CarouselContentProps {
    carouselVariant: CarouselVariant;
    cardVariant: CardVariant;
    typeParam?: string;
    title?: string;
    loop?: boolean;
    itemsPerPage?: number;
}

const ContentCarousel = ({carouselVariant, cardVariant, typeParam, title, loop,itemsPerPage}:CarouselContentProps) => {
    const {contents, fetchContents} = useContent();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchContents({
                    contentType: ContentType[typeParam?.toUpperCase() as keyof typeof ContentType],
                    page: 0, size: 10, sort: 'releaseDate,desc'
                });
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        };
        fetchData();
    }, [fetchContents]);
    
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