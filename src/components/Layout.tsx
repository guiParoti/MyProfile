import type React from "react";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        // Flex row - sidebar na esquerda, conteúdo na direita
        <div className="flex">
            <Sidebar/>

             {/* ml-56 = margem esquerda do tamanho da sidebar pra não sobrepor */}
            <main className="ml-56 flex-1 min-h-screen bg-gray-50">
                {children}
            </main>
        </div>
    )
}