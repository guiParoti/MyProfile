import type { Filme } from "./tmdb"

export const salvarFilme = async (tmdb_id: number, titulo: string, poster_url: string) : Promise<Filme | null> => {
    try {
        const resposta = await fetch(`http://localhost:3333/filmes/salvarfilme`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({tmdb_id, titulo, poster_url})
        })
        const dados = await resposta.json()
        return dados
    } catch  {
        return null
    }
}

