export interface Review {
    id_review: number
    nota: number
    review: string
    id_usuario: number
    id_filme: number
}


export const salvarReview = async (nota: number, review: string, id_usuario: number, id_filme: number) : Promise<Review | null> => {
    try {
        const resposta = await fetch(`http://localhost:3333/reviews/novareview`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({nota, review, id_usuario, id_filme})
        })
        const dados = await resposta.json()
        return dados
    }catch (e) {
        console.log(e)
        return null
    }
}


export const buscarReview = async (id_usuario: number, id_filme: number) : Promise<Review[] | null> => {
    try {
        const respota = await fetch(`http://localhost:3333/reviews/minhasreviews?id_usuario=${id_usuario}&id_filme=${id_filme}`)
        const dados = await respota.json()
        console.log(dados)
        return dados
    } catch (e) {
        return []
    }
}

export const removerFilme = async (id_review: number, id_filme: number) : Promise<string | null> => {
    try {
        const resposta = await fetch(`http://localhost:3333/reviews/minhasreviews/remover`, {
            method: "DELETE", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ id_review, id_filme})
        })
        const dados = await resposta.json()
        return dados.mensagem
    } catch (e) {
        return null
    }
}