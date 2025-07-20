import Image from "next/image";
import {Star} from "lucide-react"
import {Content} from "@/types/Content";
import {Card} from "@/components/ui/card";

const ContentCard = (conteudo: Content) => {
    return (
        <Card className="bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm">
            <div className="space-y-4">
                <div className={`aspect-[3/4] rounded-lg flex items-center justify-center overflow-hidden shadow-lg`}>
                    {conteudo.urlImagem ? (
                        <Image
                            src={conteudo.urlImagem}
                            alt={`Poster de ${conteudo.titulo}`}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                            {conteudo.tipoConteudo} Poster
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-purple-400 text-xl font-semibold">{conteudo.titulo}</h3>
                    <p className="text-gray-400 text-sm mt-1 capitalize">{conteudo.tipoConteudo}</p>
                    <p className="text-gray-300 text-sm mt-2">
                        {conteudo.descricao}
                    </p>
                    <div className="flex items-center mt-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-yellow-400 font-bold text-lg">{conteudo.nota}</span>
                        <span className="text-gray-400 ml-1">/5</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ContentCard;