import "dotenv/config"
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import { routes } from "./routes";

const app = express();
app.use(express.json())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(400).json({
            message: error.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "internal server error"
    })
})

app.use(routes)



app.listen(Number(process.env.API_PORT), () => console.log("server on"))