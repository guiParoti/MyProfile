import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscaPorId, type Filme } from "../services/tmdb";
import { useUsuario } from "../contexts/UsuarioContext/UseUsuario";
import { salvarFilme } from "../services/filmes";
import { salvarReview } from "../services/reviews";

export const Detalhes = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [nota, setNota] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  const { usuario } = useUsuario()

  const salvar = async () => {
    if(filme && usuario) {
      const filmeSalvo = await salvarFilme(filme.id, filme.title, filme.poster_path)
      if(filmeSalvo) {
        await salvarReview(nota, review, usuario.id_user as number, filmeSalvo.id_filme)
        setShowReview(false)
      }
    }
  }

  useEffect(() => {
    const buscar = async (idFilme: string) => {
      try {
        setFilme(await buscaPorId(idFilme));
      } catch (e) {
        console.log(e);
      }
    };
    if (id) buscar(id);
  }, []);

  return (
    <div className="relative min-h-screen">
        {/* banner de fundo desfocado */}
        <div className="absolute inset-0 z-0"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${filme?.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px) brightness(0.3)"
            }}
        />

        {/* conteúdo por cima do banner */}
        <div className="relative z-10 p-8 max-w-4xl">
            <div className="flex gap-8">
                <img
                    src={`https://image.tmdb.org/t/p/w300${filme?.poster_path}`}
                    className="rounded-2xl shadow-xl w-64 h-auto"
                />
                <div className="flex flex-col gap-4">
                    {/* muda as cores pra branco pra contrastar com o fundo escuro */}
                    <h1 className="text-4xl font-bold text-white">{filme?.title}</h1>

                    <div className="flex gap-2 flex-wrap">
                        {filme?.genres.map((g) => (
                            <span key={g.id}
                                className="bg-white text-blue-700 rounded-full px-3 py-1 text-sm font-bold">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-6 text-gray-300">
                        <span>Média: {filme?.vote_average.toFixed(1)}</span>
                        <span>Duração: {filme?.runtime} min</span>
                        <span>Ano: {filme?.release_date.slice(0, 4)}</span>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{filme?.overview}</p>

                    <button onClick={() => setShowReview(true)}
                        className="bg-blue-600 text-white rounded-lg p-3 w-48 font-bold hover:bg-blue-700 transition-colors">
                        + Salvar filme
                    </button>
                </div>
            </div>
        </div>

        {/* modal de review — fica fora do z-10 pra aparecer por cima de tudo */}
        {showReview && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowReview(false)}>
                <div className="bg-white rounded-2xl p-6 w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-xl font-bold mb-6 text-center">Sua Review</h3>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-600 block mb-2">Nota (1-10)</label>
                        <input type="number" min={1} max={10} value={nota}
                            onChange={(e) => setNota(e.target.valueAsNumber)}
                            className="border border-gray-300 rounded-lg p-3 w-24 focus:outline-none focus:border-blue-500"/>
                    </div>
                    <div className="mb-6">
                        <label className="text-sm font-bold text-gray-600 block mb-2">Review</label>
                        <textarea value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="O que você achou do filme?"
                            rows={4}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 resize-none"/>
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setShowReview(false)}
                            className="border border-gray-300 text-gray-600 rounded-lg p-3 flex-1 hover:bg-gray-50">
                            Cancelar
                        </button>
                        <button type="button" onClick={salvar}
                            className="bg-blue-600 text-white rounded-lg p-3 flex-1 font-bold hover:bg-blue-700">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
)
};
