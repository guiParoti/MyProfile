import { useEffect, useState } from "react"
import { buscaPorNomes, buscarPopulares, type Filme } from "../services/tmdb"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const [filmesPopulares, setFilmesPopulares] = useState<Filme[] | null>([])
    const [nomeFilme, setNomeFilme] = useState<string>('')
    const [resultados, setResultados] = useState<Filme[]>([])
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

    return (
        <div>
            <h2>HOME</h2>
            <div>
                <input type="text"
                    value={nomeFilme}
                    onChange={(e) => setNomeFilme(e.target.value)}
                    />
                <div>
                    <button type="button"
                        onClick={() => buscarPorNome(nomeFilme)}>Buscar</button>
                </div>
            </div>
            {showModal && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}> 

                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-96 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}> 

                        <h3>Resultados</h3>
                        {resultados.map((filme) => (
                            <div key={filme.id} className="flex gap-4 p-2 border-b"
                            onClick={() => {
                                setShowModal(false)
                                navigate(`/detalhes/${filme.id}`)
                            }}>
                                <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} className="w-12"/>
                                <span>{filme.title}</span>
                            </div>
                        ))} 
                        
                    </div>
                </div>
            )}
            <hr/>
            <div>
                <h3>Filmes populares</h3>
                {filmesPopulares?.map((filme) => (
                    <div key={filme.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}></img>
                        <span>{filme.title}</span>
                    </div>
                ))}
            </div>
        </div>

    )
}