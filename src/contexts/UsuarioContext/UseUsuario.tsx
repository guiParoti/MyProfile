import { useContext } from "react"
import { UsuarioContext } from "./UsuarioContext"

export const useUsuario = () => {
    const context = useContext(UsuarioContext)
    if(!context) throw new Error('Usuário não cadastrado')
    return context
}