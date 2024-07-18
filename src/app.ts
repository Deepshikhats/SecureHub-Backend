import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./routes/userRoutes";

/*******************   CONSTANTS  ************************* */
const app = express();
const corsOptions = {
  origin: "https://secure-hub-frontend.vercel.app/", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
};

/********************** Middlewares *********************** */
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", UserRouter);

/********************* DB CONNECT ************************** */

mongoose
  .connect("mongodb://localhost:27017/Authentication_App", {
    family: 4, //ipv4
  })
  .then(() => {
    console.log("DB connected");
    app.listen(8081, () => console.log("listening"));
  })
  .catch(() => console.log("conection failed"));

app.post("/", (req, res) => {
  res.send("Got it");
});
