import { Router } from "express"
import { database } from "../database"
import { RowDataPacket } from "mysql2"


const router = Router()


router.post("/salvarfilme", async (req, res) => {
    const { tmdb_id, titulo, poster_url } = req.body
    const [resultado] = await database.execute("INSERT INTO filmes (tmdb_id, titulo, poster_url) VALUES (?, ?, ?)", [tmdb_id, titulo, poster_url])
    const id_filme = (resultado as any).insertId // Pega o id gerado pelo AUTO_INCREMENT
    res.json({ id_filme, tmdb_id, titulo, poster_url})
})


router.get("/meusfilmes", async (req, res) => {
    const { id_user } = req.query  // req.query pega parâmetros da URL — ex: /meusfilmes?id_user=1
    // Infeliz quando criei a tabela de filmes no banco, não botei uma fk de usuários e tive que meter essa gambiarra de pegar os filmes que batem com o id do filme na tabela de reviews(que possui um fk_id_usuario)
    const [rows] = await database.execute<RowDataPacket[]>(`SELECT * FROM filmes WHERE id_filme IN (SELECT id_filme FROM reviews WHERE id_usuario = ?)`, [Number(id_user)])
    res.json(rows)
})


export default router