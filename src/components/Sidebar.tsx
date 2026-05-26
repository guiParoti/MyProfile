import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscaPorNomes, type Filme } from "../services/tmdb";
import { Resultados } from "./Resultados";

export const Sidebar = () => {
  const [nomeFilme, setNomeFilme] = useState<string>('')
  const [resultados, setResultados] = useState<Filme[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [busca, setBusca] = useState<boolean>(false)
   const navigate = useNavigate();

  const buscarPorNome = async (nome: string) => {
    const filmes = await buscaPorNomes(nome);
    setResultados(filmes);
    setShowModal(true);
    setBusca(false)
  };

  const fecharModal = () => {
    setShowModal(false)
}

  return (
    // Sidebar fixa na esquerda, altura total da tela

  
    <div className="fixed left-0 top-0 h-screen w-56 bg-gray-900 flex flex-col p-6 gap-4">
      <h1 className="text-white text-2xl font-bold mb-6">MyProfile</h1> 

      <button  onClick={() => setBusca(true)} className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 text-left transition-colors">
        Buscar
      </button>
      
      {/* Modal de busca */}
      {busca && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setBusca(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[600px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="mb-6">
                    <label className="text-sm font-bold text-gray-600 block mb-2">Nome do filme</label>
                    <input value={nomeFilme} onChange={(e) => setNomeFilme(e.target.value)} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 resize-none"/>
                </div>
                <div>
                    <button type="button" onClick={() => buscarPorNome(nomeFilme)}  className="w-full bg-blue-600 text-white rounded-lg p-3 flex-1 font-bold hover:bg-blue-700">
                        Buscar
                    </button>
                </div>
            </div>
        </div>
      )}
      <Resultados show={showModal} resultados={resultados} onFechar={fecharModal}/>
      <button
        onClick={() => navigate("/home")}
        className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 text-left transition-colors"
      >
        Home
      </button>

      <button
        onClick={() => navigate("/meusfilmes")}
        className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 text-left transition-colors"
      >
        Meus filmes
      </button>
    </div>
  );
};
