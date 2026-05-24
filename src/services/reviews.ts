interface Review {
    id: number
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