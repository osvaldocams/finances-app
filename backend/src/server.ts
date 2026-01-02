import express from 'express'
import { connectDB } from './config/db'
import movementRoutes from './routes/movementRoutes'
import AccountRoutes from './routes/AccountRoutes'
import tagRoutes from './routes/tagRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors'

connectDB()

const app = express()

app.use(cors(corsConfig))

app.use(express.json())

//routes
app.use('/api/movements', movementRoutes)
app.use('/api/accounts', AccountRoutes)
app.use('/api/tag', tagRoutes)

export default app