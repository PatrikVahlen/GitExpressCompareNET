import express, { Application, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupMongoDb } from "./models/todos-repository";
import todosController from "./controllers/todos-controller";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(json());
const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoURL: string = process.env.MONGODB_URL || "mongodb://localhost:27017/Teknik";

app.use("/todos", todosController);

app.listen(port, async function () {
  await setupMongoDb(mongoURL);
  console.log(`App is listening on port ${port}`);
});
