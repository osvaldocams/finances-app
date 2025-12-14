import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { accountTypesList, MovementBody } from "../types"


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

export const validateMovementLogic = (req: Request<{},{},MovementBody>, res: Response, next: NextFunction) => {
    const {type, incomeAccount, expenseAccount} = req.body
    const cash = accountTypesList.find(a => a === 'CASH') 

    const error = (message: string) => res.status(400).json({ errors: [{ msg: message }] })
    // ========== TYPE RULES ==========
    if(type === 'income'){
        if (!incomeAccount) return error("incomeAccount is required for income type")
        if (expenseAccount) return error("expenseAccount is not allowed for income type")
    }
    if(type === 'expense'){
        if(!expenseAccount) return error("expenseAccount ir required for expense type")
        if(incomeAccount) return error("incomeAccount ir required for expense type")
    }
    if(type === 'transfer'){
        if(!incomeAccount || !expenseAccount)return error("Both incomeAccount and expenseAccount are required for transfer type")
        if (incomeAccount === expenseAccount)return error("incomeAccount and expenseAccount cannot be the same for transfer type")
    }
    if(type === 'deposit'){
        if (!incomeAccount || !expenseAccount)return error("Both incomeAccount and expenseAccount are required for deposit type")
        if (expenseAccount !== cash)return error("For deposit type, expenseAccount must be CASH")
        if (incomeAccount === expenseAccount)return error("incomeAccount and expenseAccount cannot be the same for deposit type")
    }
    next()
}

export const normalizeAmount = (req: Request<{},{},MovementBody>, res: Response, next: NextFunction) => {
    const {type, amount} = req.body

    if(typeof amount !== 'number'){
        return res.status(400).json({errors: [{ msg: 'Amount must be a number to normalize account' }]})
    }

    let normalized = amount

    switch (type) {
        case 'income':
        case 'transfer':
        case 'deposit':
            normalized = Math.abs(amount)
            break;
        case 'expense':
            normalized = -Math.abs(amount)
            break;
        default:
            break;
    }

    req.body.amount = normalized
    next()
}