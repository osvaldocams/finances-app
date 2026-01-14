import { Request, Response } from "express";
import Account from "../models/Account"
import { CreateAccountBody } from "../types";




export class AccountController {

    static createAccount = async (req: Request<{},{},CreateAccountBody>, res: Response) =>{
        try {
            const { name, kind } = req.body
            // duplicate account validation
            const existing = await Account.findOne({name})
            if(existing){
                return res.status(409).json({error: `Account '${name}' already exist`})
            }
            //acount creation
            const account = new Account({name, kind})
            await account.save()
            res.json(account)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Error creating account'})
        }
    }

    static getAllAccounts = async (req: Request, res: Response) => {
        try {
            const accounts = await Account.find({}).lean()
            res.json(accounts)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error fetching accounts" })
        }
    }

    static getAccountById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const account = await Account.findById(id).lean()
            if(!account){
                const error = new Error("Account not found")
                return res.status(404).json({ error: error.message }) 
            }
            res.json(account)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'error fetching account'})
        }
    }

    static updateAccount = async (req: Request<{ id: string }, {}, { name?: string, kind?: string }>, res: Response) => {
        try {
            const { id } = req.params
            const { name, kind } = req.body
            const account = await Account.findById(id)
            if (!account) {
                return res.status(404).json({ error: 'Account not found' })
            }
            if (name) {
                account.name = name
            }
            if (kind) {
                account.kind = kind
            }
            await account.save()
            res.json(account)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error updating account' })
        }
    }
