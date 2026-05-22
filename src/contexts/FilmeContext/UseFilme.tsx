import { useContext } from "react"
import { FilmeContext } from "./FilmeContext"

export const useFilme = () => {
    const context = useContext(FilmeContext)
    if(!context) throw new Error('Lista de filmes vazia')
    return context
}