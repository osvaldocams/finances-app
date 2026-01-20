import api from "../lib/axios"
import { accountListSchema } from "../types"
import { handleApiError } from "./handleApiError"


export async function getAllAccounts(){
    try {
        const {data} = await api('/accounts')
        const response = accountListSchema.safeParse(data)
        if(!response.success){
            throw new Error('invalid account format')
        } 
        return response.data
    } catch (error) {
        //debugging logs for development only
        handleApiError(error, 'Error getting accounts')
    }
}