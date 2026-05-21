import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { buscaPorId, type Filme } from "../services/tmdb"

export const Detalhes = () => {
    const { id } = useParams()
    const [filme, setFilme] = useState<Filme | null>(null)

    useEffect(() => {
        const buscar = async (idFilme: string) => {

            try {
                setFilme(await buscaPorId(idFilme))
            }
            catch (e) {
                console.log(e)
            }
        }
        if(id) buscar(id)
    }, [])

    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w200${filme?.poster_path}`}/>
            <hr/>
            <span>{filme?.title}</span>
            <hr/>
            <span>{filme?.overview}</span>
            <hr/>
            <span>{filme?.release_date}</span>
            <hr/>
        </div>
    )
}