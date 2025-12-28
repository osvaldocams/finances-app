import { CorsOptions } from "cors"

const whitelist = [
    process.env.FRONTEND_URL
].filter(Boolean)

export const corsConfig: CorsOptions = {
    origin:(origin, callback) => {
        if(!origin) {
            return callback(null, true)
        }
        if(whitelist.includes(origin)) {
            return callback(null, true)
        }
        callback(new Error(`CORS blocked origin: ${origin}`))
    },
    credentials: true,
    optionsSuccessStatus: 200
}