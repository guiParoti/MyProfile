import { Navigate } from "react-router-dom";
import { useUsuario } from "../contexts/UsuarioContext/UseUsuario";

type RotaProps = {
    children: React.ReactNode
}

export const RotaProtegida = ({ children } : RotaProps)  => {
    const { autenticado } = useUsuario()
    if(!autenticado) return <Navigate to={"/login"}/>
    return children
} 