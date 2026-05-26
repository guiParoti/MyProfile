import { useEffect, useState } from "react"
import { buscaPorNomes, buscarPopulares, type Filme } from "../services/tmdb"
import { useNavigate } from "react-router-dom"
import { Resultados } from "../components/Resultados"

export const Home = () => {
    const [filmesPopulares, setFilmesPopulares] = useState<Filme[] | null>([])
    const [resultados, setResultados] = useState<Filme[]>([])
    const [nomeFilme, setNomeFilme] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [erro, setErro] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    useEffect(() => {
        const carregar = async () => {
        setLoading(true)
        try {
            setFilmesPopulares(await buscarPopulares())
        } catch (e) {
            setErro('Erro ao carregar filmes populares')
            console.log(e)
        } finally {
            setLoading(false)
        }
        }
        carregar()
    }, [])

    const buscarPorNome = async (nome : string) => {
        const filmes = await buscaPorNomes(nome)
        setResultados(filmes)
        setShowModal(true)
    }

    const fecharModal = () => {
        setShowModal(false)
    }

return (
    <div className="p-8">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6"> Filmes</h2>

        {/* Barra de busca */}
        <div className="flex gap-3 mb-8">
            <input type="text"
                value={nomeFilme}
                onChange={(e) => setNomeFilme(e.target.value)}
                placeholder="Buscar filme..."
                className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:border-blue-500"
            />
            <button type="button"
                onClick={() => buscarPorNome(nomeFilme)}
                className="bg-blue-600 text-white rounded-lg px-6 font-bold hover:bg-blue-700 transition-colors">
                Buscar
            </button>
        </div>

        {/* Modal de Resultados de busca */}
        <Resultados show={showModal} resultados={resultados} onFechar={fecharModal}/>

        {/* Grid de filmes populares */}
        <h3 className="text-xl font-bold text-gray-700 mb-4"> Populares</h3>
        <div className="grid grid-cols-4 gap-6">
            {filmesPopulares?.map((filme) => (
                <div key={filme.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => navigate(`/detalhes/${filme.id}`)}>
                    <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} className="w-full"/>
                    <div className="p-3">
                        <span className="font-bold text-sm text-gray-700">{filme.title}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
}