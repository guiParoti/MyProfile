import { useState } from "react"
import type { Filme } from "../../services/tmdb"
import { FilmeContext } from "./FilmeContext"

export const FilmeProvider = ({children} : {children: React.ReactNode}) => {
    const [meusFilmes, setMeusFilmes] = useState<Filme[]>([])

    const adicionarFilme = (filme: Filme) => {
        setMeusFilmes([...meusFilmes, filme])
    }

    return (
        <FilmeContext.Provider value={{filmes: meusFilmes, adicionarFilme}}>
            {children}
        </FilmeContext.Provider>
    )
 
}