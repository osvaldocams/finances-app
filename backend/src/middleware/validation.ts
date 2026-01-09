import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import {  MovementBody } from "../types"
import Account from "../models/Account"


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

export const validateMovementLogic = async(req: Request<{},{},MovementBody>, res: Response, next: NextFunction) => {
    const {type, incomeAccountId, expenseAccountId} = req.body

    const error = (message: string) => res.status(400).json({ errors: [{ msg: message }] })
    
    // ========== TYPE RULES ==========
    if(type === 'income'){
        if (!incomeAccountId) return error("incomeAccountId is required for income type")
        if (expenseAccountId) return error("expenseAccountId is not allowed for income type")
    }
    if(type === 'expense'){
        if(!expenseAccountId) return error("expenseAccountId is required for expense type")
        if(incomeAccountId) return error("incomeAccountId is not allowed for expense type")
    }
    if(type === 'transfer' || type === 'deposit'){
        if(!incomeAccountId || !expenseAccountId)return error("Both incomeAccountId and expenseAccountId are required for this movement type")
        if (incomeAccountId === expenseAccountId)return error("incomeAccountId and expenseAccountId cannot be the same for transfer type")
    }
    // Load accounts
    const [incomeAccount, expenseAccount] = await Promise.all([
        incomeAccountId ? Account.findById(incomeAccountId) : null,
        expenseAccountId ? Account.findById(expenseAccountId) : null
    ])
    if(incomeAccountId && !incomeAccount){
        return error("incomeAccountId does not correspond to a valid account")
    }
    if(expenseAccountId && !expenseAccount){
        return error("expenseAccountId does not correspond to a valid account")
    }
    //type specific business rules
    if(type === 'deposit'){
        //cash -> bank
        if(expenseAccount!.kind !== 'cash'){
            return error("For deposit type, expenseAccount must be of kind 'cash'")
        }
        if(incomeAccount!.kind === 'cash'){
            return error("For deposit type, incomeAccount cannot be of kind 'cash'")
        }
    }
    if(type === 'transfer'){
        //bank -> bank
        if(incomeAccount!.kind === 'cash' || expenseAccount!.kind === 'cash'){
            return error("transfer are only allowed between bank accounts")
        }
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