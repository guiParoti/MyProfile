export interface Filme {
    id: number
    title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
}

export const buscarPopulares = async () : Promise<Filme[]> => {
    try{
        const resposta = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=10fe5474f29c3148093c2c3ea019ba88&language=pt-BR")
        const dados = await resposta.json()
        return dados.results
    } catch(e) {
        return []
    }
}

export const buscaPorNomes = async (nome: string) : Promise<Filme[]> => {
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=10fe5474f29c3148093c2c3ea019ba88&language=pt-BR&query=${nome}`)
        const dados = await resposta.json()
        return dados.results
    }catch (e) {
        return []
    }
}


export const buscaPorId = async (id: string) : Promise<Filme | null> => {
    try{
        const resposta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=10fe5474f29c3148093c2c3ea019ba88&language=pt-BR`)
        const dados = await resposta.json()
        return dados
    } catch (e) {
        return null
    }
}