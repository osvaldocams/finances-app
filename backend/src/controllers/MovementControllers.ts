import { Request, Response } from "express";
import Movement from "../models/Movement";

export class MovementController {

    static getAllMovements = async (req: Request, res: Response) => {
        res.send("Get all movements")
    }
}
