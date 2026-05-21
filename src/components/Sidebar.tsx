import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate()

    return (
         // Sidebar fixa na esquerda, altura total da tela
        <div className="fixed left-0 top-0 h-screen w-56 bg-gray-900 flex flex-col p-6 gap-4">

            <h1 className="text-white text-2xl font-bold mb-6">MyProfile</h1>

            <button
                onClick={() => navigate("/home")}
                className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 text-left transition-colors">
                Buscar
            </button>

            <button
                onClick={() => navigate("/home")}
                className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 text-left transition-colors">
                Home
            </button>

            <button 
                onClick={() => navigate("/meusfilmes")}
                className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 text-left transition-colors">
                Meus filmes
            </button>
        </div>
    )
}