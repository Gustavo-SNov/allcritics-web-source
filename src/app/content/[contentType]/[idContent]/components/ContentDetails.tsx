import {Property} from "csstype";
import {Content} from "@/types/Content";

import { Clapperboard, Gamepad2, Tv, Star, BookOpen } from "lucide-react";

const ContentDetails = ({ content }: { content: Content | null }) => {
    if (!content) {
        return null; // ou um esqueleto de carregamento (loading skeleton)
    }

    const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | number | boolean | null }) => {
        if (!value && typeof value !== 'number') return null; // Não renderiza se o valor for nulo/undefined

        let displayValue = value;
        if (typeof value === 'boolean') {
            displayValue = value ? "Sim" : "Não";
        }

        return (
            <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="text-purple-400">{icon}</div>
                <span className="font-semibold text-gray-200">{label}:</span>
                <span>{displayValue}</span>
            </div>
        );
    };

    const renderSpecificDetails = () => {
        switch (content.contentType) {
            case 'MOVIE':
                return (
                    <>
                        <DetailItem icon={<Clapperboard size={20} />} label="Diretor" value={content.director} />
                        <DetailItem icon={<Clapperboard size={20} />} label="Estúdio" value={content.studio} />
                        <DetailItem icon={<Clapperboard size={20} />} label="Duração" value={content.duration ? `${content.duration} min` : null} />
                    </>
                );
            case 'GAME':
                return (
                    <>
                        <DetailItem icon={<Gamepad2 size={20} />} label="Plataforma" value={content.platform} />
                        <DetailItem icon={<Gamepad2 size={20} />} label="Desenvolvedora" value={content.studio} />
                        <DetailItem icon={<Gamepad2 size={20} />} label="Multiplayer" value={content.multiplayer} />
                    </>
                );
            case 'SERIE':
                return (
                    <>
                        <DetailItem icon={<Tv size={20} />} label="Emissora" value={content.broadcaster} />
                        <DetailItem icon={<Tv size={20} />} label="Temporadas" value={content.numberOfSeasons} />
                        <DetailItem icon={<Tv size={20} />} label="Episódios/Temporada" value={content.episodesPerSeason} />
                    </>
                );
            case 'BOOK': // Assumindo que o campo 'director' pode ser usado para 'Autor'
                return (
                    <DetailItem icon={<BookOpen size={20} />} label="Autor" value={content.director} />
                );
            default:
                return null;
        }
    };
    return (
        <div className="mt-6 border-t border-gray-700/50 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {/* Detalhe Comum */}
                <DetailItem
                    icon={<Star size={20} className="text-yellow-400" />}
                    label="Nota Média"
                    value={content.averageRating > 0 ? content.averageRating.toFixed(1) : "N/A"}
                />
                {/* Detalhes Específicos */}
                {renderSpecificDetails()}
            </div>
        </div>
    );
}

export default ContentDetails;