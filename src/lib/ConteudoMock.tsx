import {Content} from "@/types/Content";
import {TipoConteudo} from "@/types/tipoConteudo";


export const conteudos: Content[] = [
    {
        idConteudo: 1,
        titulo: "Arcane",
        descricao: "Arcane pô",
        tipoConteudo: TipoConteudo.SERIE,
        urlImagem: "/imagens/arcane.jpg",
        dataLancamento: new Date(2021, 11, 6),
        classificacaoEtaria: "+16",
        nota: 5.0,
        dataCriacao: new Date()
    },

]