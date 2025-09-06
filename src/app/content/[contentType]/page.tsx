"use client"

import {useParams} from "next/navigation";
import {useContent} from "@/hooks/useContent";
import {useEffect} from "react";
import {ContentType} from "@/types/Content";

const ContentPage = () => {
    const {contents, fetchContents} = useContent();
    const params = useParams();
    const typeParam = (params.contentType as string).toUpperCase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchContents({
                    contentType: ContentType[typeParam as keyof typeof ContentType],
                    page: 0, size: 10, sort: 'releaseDate,desc'
                });
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        };
        fetchData();
    }, [fetchContents, typeParam]);

    console.log("Contents: ", contents);


    return (
        <div>
            Teste
        </div>

    );
}

export default ContentPage;