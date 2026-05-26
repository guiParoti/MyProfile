import { Router } from "express";
import { database } from "../database";
import { RowDataPacket } from "mysql2";

const router = Router()

router.post("/novareview", async (req, res) => {
    const { nota, review, id_usuario, id_filme } = req.body

    await database.execute("INSERT INTO reviews (nota, review, id_usuario, id_filme) VALUES (?, ?, ?, ?)", [nota, review, id_usuario, id_filme])
    res.json({
        nota,
        review,
        id_usuario,
        id_filme
    })
})

router.get("/minhasreviews", async (req, res) => {
    const { id_usuario, id_filme } = req.query
    const [rows] = await database.execute<RowDataPacket[]>(`SELECT * FROM reviews WHERE id_usuario = ? AND id_filme = ?`, [Number(id_usuario), Number(id_filme)])
    res.json(rows)
})

router.delete("/minhasreviews/remover", async (req, res) => {
    const { id_review, id_filme } = req.body
    await database.execute("DELETE FROM reviews WHERE id_review = ?", [id_review])
    await database.execute("DELETE FROM filmes WHERE id_filme = ?", [id_filme])
    res.json({mensagem: "Filme removido!"})
})
export default router