import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "../../services/usuario";
import React, { useState } from "react";
import { cadastrar as cadastrarService, login as loginService } from "../../services/usuario";
import { useNavigate } from "react-router-dom";

export const UsuarioProvider = ({children} : {children: React.ReactNode}) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [autenticado, setAutenticado] = useState<boolean>(false)
    const navigate = useNavigate()

    const cadastrar = async (nome: string, email: string, senha: string) => {
       const dados = await cadastrarService(nome, email, senha)
       if(dados) {
        setUsuario(dados)
        setAutenticado(true)
        navigate("/home")
       }
    }

    const login = async (email: string, senha: string) => {
        const dados = await loginService(email, senha)
        if(dados) {
            setUsuario(dados) 
            setAutenticado(true)
            navigate("/home")
        }
    }

    return (
        <UsuarioContext.Provider value={{usuario: usuario, autenticado, cadastrar, login}}>
            {children}
        </UsuarioContext.Provider>
    )

}