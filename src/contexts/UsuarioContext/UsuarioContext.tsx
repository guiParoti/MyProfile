import { createContext } from "react";
import type { Usuario } from "../../services/usuario";

interface UsuarioContextProps {
    usuario: Usuario | null
    cadastrar: (nome: string, email: string, senha: string) => void
    login: (email: string, senha: string) => void
}

export const UsuarioContext = createContext<UsuarioContextProps | null>(null)