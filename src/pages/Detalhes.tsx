import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscaPorId, type Filme } from "../services/tmdb";

export const Detalhes = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [nota, setNota] = useState<number>(1);
  const [review, setReview] = useState<string>("");

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
    <div className="p-8 max-w-4xl">
      {/* Layout em duas colunas — poster + infos */}
      <div className="flex gap-8">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w300${filme?.poster_path}`}
          className="rounded-2xl shadow-xl w-64 h-auto"
        />

        {/* Informações */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">{filme?.title}</h1>

          {/* Gêneros */}
          <div className="flex gap-2 flex-wrap">
            {filme?.genres.map((g) => (
              <span
                key={g.id}
                className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-bold"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Nota e duração */}
          <div className="flex gap-6 text-gray-600">
            <span>⭐ {filme?.vote_average.toFixed(1)}</span>
            <span>⏱ {filme?.runtime} min</span>
            <span>📅 {filme?.release_date}</span>
          </div>

          {/* Descrição */}
          <p className="text-gray-600 leading-relaxed">{filme?.overview}</p>

          {/* Botão salvar */}
          <button
            onClick={() => setShowReview(true)}
            className="bg-blue-600 text-white rounded-lg p-3 w-48 font-bold hover:bg-blue-700 transition-colors"
          >
            + Salvar filme
          </button>
        </div>
      </div>
            {showReview && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowReview(false)}>
                 <div className="bg-white rounded-2xl p-6 w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-6 text-center"> Sua Review</h3>

              {/* Nota */}
              <div className="mb-4">
                <label className="text-sm font-bold text-gray-600 block mb-2">
                  Nota (1-10)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={nota}
                  onChange={(e) => setNota(e.target.valueAsNumber)}
                  className="border border-gray-300 rounded-lg p-3 w-24 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Review */}
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-600 block mb-2">
                  Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="O que você achou do filme?"
                  rows={4}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReview(false)}
                  className="border border-gray-300 text-gray-600 rounded-lg p-3 flex-1 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white rounded-lg p-3 flex-1 font-bold hover:bg-blue-700"
                >
                  Salvar
                </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};
