import "dotenv/config"
import express, { request, response } from "express"

const app = express();

app.get("/", (request, response) => {
    return response.json({
        message: "hello app"
    })
})

app.listen(Number(process.env.API_PORT), () => console.log("server on"))