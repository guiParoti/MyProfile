import { type Filme } from "../services/tmdb";
import { useNavigate } from "react-router-dom";

interface BuscarProps {
    show: boolean
    resultados: Filme[]
    onFechar: () => void
}

export const Buscar = ({show, resultados, onFechar}: BuscarProps) => {
    const navigate = useNavigate()
    
    return (
        <div>
        {show && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={onFechar}>
                <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[600px] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-xl font-bold mb-4">Resultados</h3>
                    {resultados.map((filme) => (
                        <div key={filme.id}
                            className="flex gap-4 p-3 border-b cursor-pointer hover:bg-gray-50"
                            onClick={() => { onFechar(); navigate(`/detalhes/${filme.id}`) }}>
                            <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} className="w-12 rounded"/>
                            <div className="flex flex-col">
                                <span className="font-medium">{filme.title}</span>
                                <span className="text-sm text-gray-400 block">{filme.release_date?.slice(0, 4)}</span>
                            </div>
                        </div>
                    ))} 
                </div>
            </div>
        )}
    </div>
    )
}