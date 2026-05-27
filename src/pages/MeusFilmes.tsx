import { useEffect, useState } from "react";
import { buscarMeusFilmes, type FilmeSalvo } from "../services/filmes";
import { useUsuario } from "../contexts/UsuarioContext/UseUsuario";
import { buscarReview, editarReview, removerFilme, type Review } from "../services/reviews";

export const MeusFilmes = () => {
  const { usuario } = useUsuario();
  const [filmes, setFilmes] = useState<FilmeSalvo[] | null>([]);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [filme, setFilme] = useState<FilmeSalvo | null>();
  const [review, setReview] = useState<Review[] | null>([]);
  const [showEditar, setShowEditar] = useState<boolean>(false);
  const [novaNota, setNovaNota] = useState<number>()
  const [novaReview, setNovaReview] = useState<string>()
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const buscar = async () => {
      setLoading(true);
      try {
        const dados = await buscarMeusFilmes(Number(usuario?.id_user));
        setFilmes(dados as []);
      } catch {
        setErro("Nenhum filme salvo ainda!");
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, []);

  const selecionarFilme = (filme: FilmeSalvo) => {
    setFilme(filme);
  };

  const buscarFilmeReview = async (id_usuario: number, id_filme: number) => {
    const dados = await buscarReview(id_usuario, id_filme);
    console.log("Antes do set:" + dados);
    if (dados) setReview(dados);
    console.log("Depois com o set: " + review);
  };

  const remover = async (id_review: number, id_filme: number) => {
    const dados = await removerFilme(id_review, id_filme);
    console.log(dados);
  };

  const editar = async (id_review: number, nota: number, review: string) => {
    const dados = await editarReview(id_review, nota, review);
    console.log(dados)
  };;

  return (
    // padding geral da página
    <div className="p-8">
      <h3 className="text-3xl font-bold text-gray-800 mb-6"> Meus Filmes</h3>

      {/* mensagem quando lista vazia */}
      {erro && <p className="text-gray-400 text-center mt-20">{erro}</p>}

      {loading && <p className="text-gray-400 text-center mt-20">{loading}</p>}

      {/* grid de 4 colunas — gap é o espaço entre os cards */}
      <div className="grid grid-cols-4 gap-6">
        {filmes?.map((filme) => (
          <div
            key={filme.id_filme}
            onClick={async () => {
              await buscarFilmeReview(
                usuario?.id_user as number,
                filme.id_filme,
              );
              selecionarFilme(filme);
              setShowReview(true);
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            {/* w-full faz a imagem ocupar toda a largura do card */}
            <img
              src={`https://image.tmdb.org/t/p/w300${filme.poster_url}`}
              className="w-full"
            />

            {/* padding interno do card */}
            <div className="p-3 flex flex-col gap-1">
              <span className="font-bold text-sm text-gray-700">
                {filme.titulo}
              </span>
              {/*<span className="font-bold text-sm text-gray-700">{filme.release.slice(0, 4)}</span>/*}
                            {/* line-clamp-2 limita o texto a 2 linhas com ... no final */}
              {/*<span className="text-xs text-gray-400 line-clamp-3">{filme.}</span>*/}
            </div>
          </div>
        ))}
      </div>

      {showReview && (
        <div
          onClick={() => setShowReview(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              {filme?.titulo}
            </h3>
            <div className="mb-4">
              <label className="text-sm font-bold text-gray-600 block mb-2text-sm font-bold text-gray-600 block mb-2">
                Sua nota: {review?.[0]?.nota}
              </label>
            </div>
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-600 block mb-2">
                Sua review:
              </label>
              <textarea
                className="border border-gray-300 rounded-lg p-3 w-full resize-none"
                readOnly
                value={review?.[0]?.review}
                rows={4}
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="bg-blue-600 text-white rounded-lg p-3 flex-1 hover:bg-blue-700"
                onClick={() => {setShowEditar(true) 
                    setShowReview(false)}}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={async () => {
                  await remover(
                    review?.[0]?.id_review as number,
                    filme?.id_filme as number,
                  );
                  setShowReview(false);
                  setFilmes(
                    filmes?.filter((f) => f.id_filme !== filme?.id_filme) ?? [],
                  );
                }}
                className="bg-blue-600 text-white rounded-lg p-3 flex-1 hover:bg-blue-700"
              >
                Remover Filme
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditar && (
        <div
          onClick={() => setShowEditar(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              {filme?.titulo}
            </h3>
            <div className="mb-4">
              <label className="text-sm font-bold text-gray-600 block mb-2text-sm font-bold text-gray-600 block mb-2">
                Nova nota:
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={novaNota}
                onChange={(e) => setNovaNota(e.target.valueAsNumber)}
                className="border border-gray-300 rounded-lg p-3 w-24 focus:outline-none focus:border-blue-500"
              />
              <div className="mb-4">
                <label className="text-sm font-bold text-gray-600 block mb-2text-sm font-bold text-gray-600 block mb-2">
                  Nova review:
                </label>
                <textarea
                  value={novaReview}
                  onChange={(e) => setNovaReview(e.target.value)}
                  placeholder="O que você achou do filme?"
                  rows={4}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditar(false)}
                  className="border border-gray-300 text-gray-600 rounded-lg p-3 flex-1 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white rounded-lg p-3 flex-1 font-bold hover:bg-blue-700"
                  onClick={async () => { await editar(review?.[0]?.id_review as number, novaNota as number, novaReview as string)
                    setShowEditar(false)
                  }}
                >
                  Salvar
                </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
