"use client"

import { useParams } from "next/navigation";

const ContentPage = () => {
    const params = useParams();
    const contentType = (params.contentType as string).toUpperCase();

    console.log("params: ",params);
    console.log("contentType: ",contentType);
    
    return (
        <div>
            Teste
        </div>

    );
}

export default ContentPage;