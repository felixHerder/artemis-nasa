import express from "express";
const cors = require("cors");
import path from "path";
import expressStaticGzip from "express-static-gzip";
import morgan from "morgan";
import api from "./routes/api";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("tiny"));
app.use(express.json());

// // emulate latency
// app.use((req,res,next)=>{
//   setTimeout(()=>next(),1000)
// })

//API
app.use(process.env.API_VERSION as string, api);

//Serve client files with gzip
const pathToClient = path.join(__dirname, "..", "public");
app.use("/", expressStaticGzip(pathToClient, { index: false }));
app.get("/*", (req, res) => {
  res.sendFile(path.join(pathToClient, "index.html"));
});

export default app;
