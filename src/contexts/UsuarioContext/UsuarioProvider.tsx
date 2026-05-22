import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "../../services/usuario";
import React, { useState } from "react";
import { cadastrar as cadastrarService, login as loginService } from "../../services/usuario";

export const UsuarioProvider = ({children} : {children: React.ReactNode}) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const cadastrar = async (nome: string, email: string, senha: string) => {
       const dados = await cadastrarService(nome, email, senha)
       if(dados) setUsuario(dados)
    }

    const login = async (email: string, senha: string) => {
        const dados = await loginService(email, senha)
        if(dados) setUsuario(dados)
    }

    return (
        <UsuarioContext.Provider value={{usuario: usuario, cadastrar, login}}>
            {children}
        </UsuarioContext.Provider>
    )

}