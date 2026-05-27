import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "../../services/usuario";
import React, { useState } from "react";
import { cadastrar as cadastrarService, login as loginService } from "../../services/usuario";
import { useNavigate } from "react-router-dom";

export const UsuarioProvider = ({children} : {children: React.ReactNode}) => {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const dados = localStorage.getItem("usuario") // o estado verifica se existe um usuario no localstorage, se sim pega esse usuario e autentica ele, senão começa vazio com o estado vazio e autenticado false
        return dados ? JSON.parse(dados) : null
    })
    const [autenticado, setAutenticado] = useState<boolean>(() => {
        return localStorage.getItem("usuario") !== null
    })
    const navigate = useNavigate()

    const cadastrar = async (nome: string, email: string, senha: string) => {
       const dados = await cadastrarService(nome, email, senha)
       if(dados) {
        setUsuario(dados)
        setAutenticado(true)
        localStorage.setItem("usuario", JSON.stringify(dados))
        navigate("/home")
       }
    }

    const login = async (email: string, senha: string) : Promise<string | null> => {
        const dados = await loginService(email, senha)
        if(dados) {
            setUsuario(dados) 
            setAutenticado(true)
            localStorage.setItem("usuario", JSON.stringify(dados)) // salva no localstorage ao fazer login
            navigate("/home")
            return null
        }
        return 'Usuário ou senha incorreto!'
    }

    const logout = () => {
        if(usuario) {
            setUsuario(null)
            setAutenticado(false)
            localStorage.removeItem("usuario")
            navigate("/login")
        }
    }

    return (
        <UsuarioContext.Provider value={{usuario: usuario, autenticado, cadastrar, login, logout}}>
            {children}
        </UsuarioContext.Provider>
    )

}