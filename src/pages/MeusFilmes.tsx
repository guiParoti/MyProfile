import { useFilme } from "../contexts/FilmeContext/UseFilme"

export const MeusFilmes = () => {
    const { filmes } = useFilme()

    return (
        // padding geral da página
        <div className="p-8">
            
            <h3 className="text-3xl font-bold text-gray-800 mb-6">🎬 Meus Filmes</h3>

            {/* mensagem quando lista vazia */}
            {filmes.length === 0 && (
                <p className="text-gray-400 text-center mt-20">Nenhum filme salvo ainda!</p>
            )}

            {/* grid de 4 colunas — gap é o espaço entre os cards */}
            <div className="grid grid-cols-4 gap-6">
                {filmes.map((filme) => (
                    
                    <div key={filme.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                        
                        {/* w-full faz a imagem ocupar toda a largura do card */}
                        <img src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} className="w-full"/>
                        
                        {/* padding interno do card */}
                        <div className="p-3 flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-700">{filme.title}</span>
                            <span className="font-bold text-sm text-gray-700">{filme.release_date.slice(0, 4)}</span>
                            {/* line-clamp-2 limita o texto a 2 linhas com ... no final */}
                            <span className="text-xs text-gray-400 line-clamp-3">{filme.overview}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}