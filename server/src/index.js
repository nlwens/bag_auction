import express from 'express';
const app = express()
const port = 3000

import cors from 'cors'
import bodyParser from "body-parser";
import bagsRouter from "./routes/bags-router.js";
import auth from "./routes/auth.js"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/auth", auth);
app.use("/bags", bagsRouter);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})