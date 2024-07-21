import express from 'express'
import cors from 'cors'
import UserRouter from './routes/userRoutes'
import '../config/db'
import dotenv from 'dotenv'

/*******************   CONSTANTS  ************************* */
const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080
const corsOptions = {
  origin: 'https://secure-hub-frontend.vercel.app/', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
}

/********************** Middlewares *********************** */
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', UserRouter)

/********************* DB CONNECT ************************** */
app.listen(PORT, () => console.log('listening'))
