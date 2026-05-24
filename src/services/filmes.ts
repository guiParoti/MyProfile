import type { Filme } from "./tmdb"

// Dica para mim mesmo no futuro, padronize os nomes, homem!
// Tive que criar uma interface propria dos filmes que vem do banco porque criei a tabela com a coluna "poter_url" e na tipagem do front eu uso poster_path
export interface FilmeSalvo {
    id_filme: number
    tmdb_id: number
    titulo: string
    poster_url: string
}

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

export const buscarMeusFilmes = async (id_user: number) : Promise<Filme[] | null> => {
    try {
        const resposta = await fetch(`http://localhost:3333/filmes/meusfilmes?id_user=${id_user}`)
        const dados = await resposta.json()
        return dados
    } catch {
        return []
    }
}

