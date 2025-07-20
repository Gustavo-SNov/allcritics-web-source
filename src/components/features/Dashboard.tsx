"use client"

import {Button} from "@/components/ui/button";

import ContentCard from "@/components/features/ContentCard";
import {useContent} from "@/hooks/useContent";
import {useEffect} from "react";

const Dashboard = () => {
    const { contents, loading, error, fetchContents } = useContent();
    console.log("Dashboard");
    console.log(contents);

    useEffect(() => {
        fetchContents();
    }, []);

    if (loading) {
        console.log("Loading...");
    }

    if (error) {
        console.log(error);
    }

    return (
        <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8">
                        <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Discover and share
                            <br />
                            <span className="text-purple-400">reviews</span> for movies,
                            <br />
                            TV shows, and more
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Join the community of critics and share your thoughts on various media.
                        </p>
                        <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Right Column - Carousel */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative max-w-sm w-full">
                            {/* Carousel Container */}
                            <div className="relative overflow-hidden rounded-lg">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"

                                >
                                    {contents.map((content) => (
                                        <div key={content.idConteudo} className="w-full flex-shrink-0">
                                            <ContentCard idConteudo={content.idConteudo} titulo={content.titulo} descricao={content.descricao} tipoConteudo={content.tipoConteudo} urlImagem={content.urlImagem} dataLancamento={content.dataLancamento} classificacaoEtaria={content.classificacaoEtaria} nota={content.nota} dataCriacao={content.dataCriacao} />
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;