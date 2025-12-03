import { Router } from "express"
import { MovementController } from "../controllers/MovementControllers"

const router = Router()

// Define your movement routes here
//Movement routes
router.get('/', MovementController.getAllMovements)

export default router