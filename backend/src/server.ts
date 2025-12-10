import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import movementRoutes from './routes/movementRoutes'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

//routes
app.use('/api/movements', movementRoutes)

export default app