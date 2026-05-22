import express from "express"
import cors from "cors"
import usuariosRouter from "./routes/usuarios"
import filmesRouter from "./routes/filmes"
import reviewsRouter from "./routes/reviews"

const app = express()


app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json({mensagem: "API funcionando!!!!"})
})

app.use("/usuarios", usuariosRouter)
app.use("/filmes", filmesRouter)
app.use("/reviews", reviewsRouter)


app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333")
})
