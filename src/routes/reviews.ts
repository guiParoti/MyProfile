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
    const [rows] = await database.execute<RowDataPacket[]>("SELECT * FROM reviews")
    res.json({rows})
})

export default router