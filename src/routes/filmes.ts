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
    const [rows] = await database.execute<RowDataPacket[]>("SELECT * FROM filmes")
    res.json(rows)
})


export default router