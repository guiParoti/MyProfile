import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Detalhes } from "../pages/Detalhes"
import { Layout } from "../components/Layout"
import { MeusFilmes } from "../pages/MeusFilmes"

export const Rotas = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Navigate to={"/home"}/>}/>
            <Route path="/home" element={
                <Layout>
                    <Home/>
                </Layout>}/>
            <Route path="/detalhes/:id" element={
                <Layout>
                    <Detalhes/>
                </Layout>}/>
            <Route path="/meusfilmes" element={<Layout>
                <MeusFilmes/>
            </Layout>}/>
        </Routes>
    )
}