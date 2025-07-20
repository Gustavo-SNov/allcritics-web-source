import {TipoConteudo} from "@/types/tipoConteudo";

export interface Content {
    idConteudo: string | number;
    titulo: string;
    descricao: string;
    tipoConteudo: TipoConteudo;
    urlImagem: string;
    dataLancamento: Date;
    classificacaoEtaria: string;
    nota: number;
    dataCriacao: Date;
    dataModificacao?: Date;
}

export interface Filme extends Content {
    duracao: number;
    diretor: string;
    roteirista: string;
}

export interface Game extends Content {
    plataforma: string;
    desenvolvedora: string;
    multiplayer: boolean;
}

export interface Serie extends Content {
    numTemporadas: number;
    numEpisodes: number;
    emissora: string;
}