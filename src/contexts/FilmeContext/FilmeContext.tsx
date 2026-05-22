import { createContext } from "react";
import type { Filme } from "../../services/tmdb";

interface FilmeContextProps {
    filmes: Filme[]
    adicionarFilme: (filme: Filme) => void
}

export const FilmeContext = createContext<FilmeContextProps | null>(null)