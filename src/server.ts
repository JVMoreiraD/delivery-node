import "dotenv/config"
import express from "express"
import { routes } from "./routes";

const app = express();
app.use(express.json())

app.use(routes)



app.listen(Number(process.env.API_PORT), () => console.log("server on"))