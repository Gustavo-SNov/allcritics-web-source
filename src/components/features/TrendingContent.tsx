"use client"
import {useMovie} from "@/hooks/useMovie";
import {useGame} from "@/hooks/useGame";
import {useSerie} from "@/hooks/useSerie";
import {useEffect} from "react";
import {Carousel} from "@/components/ui/carousel/Carousel";
import {Content} from "@/types/Content";
import {CardAllCritics} from "@/components/features/cards/CardAllCritics";

const TrendingContent = () => {
    const {movies, fetchMovies} = useMovie();
    const {series, fetchSeries} = useSerie();
    const {games, fetchGames} = useGame();


    useEffect(() => {
        // Define uma função async e a chama imediatamente.
        const fetchData = async () => {
            try {
                // Lembrete: Dessa forma, caso seja necessário rodar em sequência
                // await fetchMovies();
                // await fetchSeries();
                // await fetchGames();

                // Execução paralelo para melhor performance
                await Promise.all([
                    fetchMovies(),
                    fetchSeries(),
                    fetchGames()
                ]);
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        };

        fetchData();

    }, [fetchMovies, fetchSeries, fetchGames]);


    return (<section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
            <Carousel
                variant="multi-item"
                title="Trending Movies"
                loop={false}
                itemsPerPage={5}
            >
                {movies.map((item: Content) => (
                    <CardAllCritics variant="hover-card" key={item.idContent} content={item}/>
                ))}
            </Carousel>
            <Carousel
                variant="multi-item"
                title="Popular Series"
                loop={false}
                itemsPerPage={5}
            >
                {series.map((item: Content) => (
                    <CardAllCritics variant="hover-card" key={item.idContent} content={item}/>
                ))}
            </Carousel>
            <Carousel
                variant="multi-item"
                title="Top Games"
                loop={false}
                itemsPerPage={5}
            >
                {games.map((item: Content) => (
                    <CardAllCritics variant="hover-card" key={item.idContent} content={item}/>
                ))}
            </Carousel>

        </div>

    </section>)
}

export default TrendingContent;