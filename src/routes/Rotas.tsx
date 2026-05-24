import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Detalhes } from "../pages/Detalhes"
import { Layout } from "../components/Layout"
import { MeusFilmes } from "../pages/MeusFilmes"
import { Login } from "../pages/Login"
import { RotaProtegida } from "./RotaProtegida"

export const Rotas = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Navigate to={"/login"}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={
                <Layout>
                    <RotaProtegida>
                        <Home/>
                    </RotaProtegida>
                </Layout>}/>
            <Route path="/detalhes/:id" element={
                <Layout>
                    <RotaProtegida>
                        <Detalhes/>
                    </RotaProtegida>
                </Layout>}/>
            <Route path="/meusfilmes" element={
                <Layout>
                    <RotaProtegida>
                        <MeusFilmes/>
                    </RotaProtegida>
                </Layout>}/>
        </Routes>
    )
}