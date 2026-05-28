import { Router } from "express"
import { database } from "../database"
import bcrypt from "bcrypt"
import { RowDataPacket } from "mysql2"

const router = Router()

router.post("/cadastro", async (req, res) => {
    // pega os dados do body da requisição
    const { nome, email, senha } = req.body

    // gera o hash da senha — 10 é o custo (rounds)
    // quanto maior o número, mais seguro e mais lento
    const senhaHash = await bcrypt.hash(senha, 10)

    // insere no banco com o hash no lugar da senha original
    const [resultado] = await database.execute(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash]
    )
    const id_user = (resultado as any).insertId

    // retorna os dados do usuário criado (sem a senha)
    res.json({ id_user, nome, email })
})

router.post("/login", async (req, res) => {
    const { email, senha } = req.body

    // busca o usuário pelo email
    // RowDataPacket tipа o retorno como array de linhas do banco
    const [rows] = await database.execute<RowDataPacket[]>(
        "SELECT * FROM usuarios WHERE email = ?", [email]
    )


    // se não encontrou nenhum usuário com esse email
    if(rows.length === 0) {
        return res.json({ mensagem: "Usuário não encontrado!" })
    }

    // rows[0] = primeiro (e único) usuário encontrado
    const usuario = rows[0]

    // compara a senha digitada com o hash salvo no banco
    // bcrypt nunca descriptografa — só compara
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if(!senhaCorreta) {
        return res.json({ mensagem: "Senha incorreta!" })
    }
    
    // login bem sucedido — retorna dados do usuário (sem a senha)
    res.json({ mensagem: "Login efetuado!", id_user: usuario.id_user, nome: usuario.nome, email: usuario.email })
    
})

export default router