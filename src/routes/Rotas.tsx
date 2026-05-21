import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Detalhes } from "../pages/Detalhes"
import { Layout } from "../components/Layout"

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
            <Route path="/meusfilmes" element={<h1>Meus filmes</h1>}/>
        </Routes>
    )
}