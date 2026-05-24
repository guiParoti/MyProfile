export interface Usuario {
    id_user?: number
    nome: string
    email: string
    senha: string
}


export const cadastrar = async (nome: string, email: string, senha: string) : Promise<Usuario | null> => {
    try{
        const resposta = await fetch(`http://localhost:3333/usuarios/cadastro`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome, email, senha})
        })
        const dados = await resposta.json()
        return dados
    } catch {
        return null
    }
}

export const login = async (email: string, senha: string) : Promise<Usuario | null> => {
    try {
        const resposta = await fetch("http://localhost:3333/usuarios/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, senha})
        })
        const dados = await resposta.json()
        
        if(!dados.email) return null

        return dados
    } catch {
        return null
    }
}
