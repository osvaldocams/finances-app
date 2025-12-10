import { Request, Response } from "express";
import Movement from "../models/Movement";
import mongoose from "mongoose";
import Account, { IAccount } from "../models/Account";
import { type MovementBody } from "../types";

export class MovementController {

    static createMovement = async (req: Request<{},{},MovementBody>, res: Response) => {
        const session = await mongoose.startSession()
        try {
            session.startTransaction()
            
            const {type, amount, incomeAccount:incomeName, expenseAccount:expenseName, description} = req.body

            const absAmount = Math.abs(amount) //normalize amount

            //----------
            //1)mapping strings- real objectId
            //----------
            let incomeAccountDoc: IAccount | null = null
            let expenseAccountDoc: IAccount | null = null

            const incomeNameNormalized = incomeName?.trim().toUpperCase()
            const expenseNameNormalized = expenseName?.trim().toUpperCase()

            if(incomeNameNormalized || expenseNameNormalized){
                const [inc, exp] = await Promise.all([
                    incomeNameNormalized ? Account.findOne({name:incomeNameNormalized},{},{session}) : null,
                    expenseNameNormalized ? Account.findOne({name:expenseNameNormalized},{},{session}) : null
                ])
                incomeAccountDoc = inc
                expenseAccountDoc = exp
                
                if(incomeNameNormalized && !incomeAccountDoc){
                    throw new Error(`income account '${incomeName}' not found`)
                }
                if(expenseNameNormalized && !expenseAccountDoc){
                    throw new Error(`expense account '${expenseName}' not found`)
                }
            }
            //----------
            //2)type validation
            //----------
            if(['income', 'transfer', 'deposit'].includes(type) && !incomeAccountDoc){
                throw new Error('incomeAccount required for this movement type') 
            }
            if(['expense', 'transfer'].includes(type) && !expenseAccountDoc){
                throw new Error('expenseAccount required for this movement type')
            }

            //----------
            //3)create movement with objectId
            //----------
            const movement = new Movement({
                type,
                amount,
                description,
                incomeAccount: incomeAccountDoc?._id,
                expenseAccount: expenseAccountDoc?._id
            })
            await movement.save({session})
            await movement.populate(['incomeAccount', 'expenseAccount'])
            //----------
            //4)update accounts balance
            //----------
            switch(type){
                case 'income':
                    await Account.updateOne(
                        {_id: incomeAccountDoc!._id},
                        {$inc: {balance: absAmount}},
                        {session}
                    )
                    break
                case 'expense':
                    await Account.updateOne(
                        {_id:expenseAccountDoc!._id},
                        {$inc:{balance: -absAmount}},
                        {session}
                    )
                    break
                case 'transfer':
                    await Account.updateOne(
                        { _id: expenseAccountDoc!._id },
                        { $inc: { balance: -absAmount } },
                        {session}
                    )
                    await Account.updateOne(
                        {_id: incomeAccountDoc!._id},
                        {$inc: {balance: absAmount}},
                        {session}
                    )
                    break
                case 'deposit':
                    const cash = await Account.findOne(
                        {name: 'CASH'},
                        {},
                        {session}
                    )
                    if(!cash)throw new Error('CASH account not found')
                    if(!incomeAccountDoc)throw new Error('income account required for deposit')
                    if(incomeAccountDoc._id.equals(cash._id))throw new Error('income account cannot be CASH for deposit')
                    
                    await Account.updateOne(
                        {_id:cash._id},
                        {$inc:{balance:-absAmount}},
                        {session}
                    )
                    await Account.updateOne(
                        {_id:incomeAccountDoc._id},
                        {$inc:{balance:absAmount}},
                        {session}
                    )
                    break
            }
            //----------
            //5)commit
            //----------
            await session.commitTransaction()
            return res.status(201).json({
                message: "movement created",
                movement
            })

        } catch (error) {
            await session.abortTransaction()
            console.log(error)
            return res.status(400).json({error:error.message || 'error creating movement'})
        } finally{
            session.endSession()
        }
    }

    static getAllMovements = async (req: Request, res: Response) => {
        try {
            const movements = await Movement.find({}).lean()
            res.json(movements)
            
        } catch (error) {
            return res.status(500).json({ error: "Error fetching movements" });
        }
    }

    static getMovementById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const movement = await Movement.findById(id)
            if(!movement){
                const error = new Error("Movement not found")
                return res.status(404).json({ error: error.message })
            }
            res.json(movement)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Error fetching movement'})
        }
    }

    static deleteMovement = async (req: Request<{id:string}>, res: Response) =>{
        //0)stars session+transaction
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            //1)verify movement exist
            const { id } = req.params
            const movement = await Movement.findById(id).session(session)
            if(!movement){
                throw new Error('movement not found')
            }

            //2)prepare reverse operation
            const { type, amount} = movement
            const incAcc = movement.incomeAccount
            const expAcc = movement.expenseAccount

            const absAmount = Math.abs(amount)
            //safety validations
            if(['income', 'transfer', 'deposit'].includes(type) && !incAcc){
                throw new Error('income account missing in movement')
            }
            if(['expense', 'transfer'].includes(type) && !expAcc){
                throw new Error('expense account missing in movement')
            }

            //3) reverse balances
            switch(type){
                case 'income':
                    await Account.updateOne(
                        {_id: incAcc},
                        {$inc: {balance: -absAmount}},
                        {session}
                    )
                    break
                case 'expense':
                    await Account.updateOne(
                        {_id:expAcc},
                        {$inc:{balance: absAmount}},
                        {session}
                    )
                    break
                case 'transfer':
                    await Account.updateOne(
                        { _id: expAcc },
                        { $inc: { balance: absAmount } },
                        {session}
                    )
                    await Account.updateOne(
                        {_id: incAcc},
                        {$inc: {balance: -absAmount}},
                        {session}
                    )
                    break
                case 'deposit':
                    const cash = await Account.findOne(
                        {name: 'CASH'},
                        {},
                        {session}
                    )
                    if(!cash)throw new Error('CASH account not found')
                    await Account.updateOne(
                        {_id:cash._id},
                        {$inc:{balance:absAmount}},
                        {session}
                    )
                    await Account.updateOne(
                        {_id:incAcc},
                        {$inc:{balance:-absAmount}},
                        {session}
                    )
                    break
            }
            //4)delete movement
            await Movement.deleteOne(
                {_id:movement._id},
                {session}
            )
            //5)commit & response
            await session.commitTransaction()
            return res.json({
                message: 'movement deleted'
            })
        } catch (error) {
            await session.abortTransaction()
            console.log(error)
            return res.status(400).json({error:error.message || 'error deleting movement'})
        }finally{
            session.endSession()
        }
    }


    //FIXME:
    static createAccount = async (req: Request, res: Response) =>{
        const account = new Account(req.body)
        try {
            await account.save()
            res.send('account created successfully')
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Error creating account'})
        }
    }
}