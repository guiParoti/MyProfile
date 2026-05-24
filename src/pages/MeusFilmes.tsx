import { useEffect, useState } from "react"
import { buscarMeusFilmes, type FilmeSalvo } from "../services/filmes"
import { useUsuario } from "../contexts/UsuarioContext/UseUsuario"

export const MeusFilmes = () => {
    const { usuario } = useUsuario()
    const [filmes, setFilmes] = useState<FilmeSalvo[] | null>([])
    const [erro, setErro] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const buscar = async () => {
            setLoading(true)
            try {
                const dados = await buscarMeusFilmes(Number(usuario?.id_user))
                setFilmes(dados as [])
            } catch {
                setErro('Nenhum filme salvo ainda!')
            }
            finally {
                setLoading(false)
            }
        }
        buscar()
    }, [])

    return (
        // padding geral da página
        <div className="p-8">
            
            <h3 className="text-3xl font-bold text-gray-800 mb-6">🎬 Meus Filmes</h3>

            {/* mensagem quando lista vazia */}
            {erro && (
                <p className="text-gray-400 text-center mt-20">{erro}</p>
            )}
    
            {loading && (
                <p className="text-gray-400 text-center mt-20">{loading}</p>
            )}

            {/* grid de 4 colunas — gap é o espaço entre os cards */}
            <div className="grid grid-cols-4 gap-6">
                {filmes?.map((filme) => (
                    
                    <div key={filme.id_filme}
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                        
                        {/* w-full faz a imagem ocupar toda a largura do card */}
                        <img src={`https://image.tmdb.org/t/p/w300${filme.poster_url}`} className="w-full"/>
                        
                        {/* padding interno do card */}
                        <div className="p-3 flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-700">{filme.titulo}</span>
                            {/*<span className="font-bold text-sm text-gray-700">{filme.release.slice(0, 4)}</span>/*}
                            {/* line-clamp-2 limita o texto a 2 linhas com ... no final */}
                            {/*<span className="text-xs text-gray-400 line-clamp-3">{filme.}</span>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}