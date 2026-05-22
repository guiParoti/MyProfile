import myysql from "mysql2/promise"

// pool reutiliza conexões abertas em vez de criar uma nova a cada requisição
export const database = myysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "myprofile"
})