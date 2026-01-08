import { isAxiosError } from "axios"
import api from "../lib/axios"
import { accountListSchema } from "../types"

// express validation error format
type ValidationError = {
    location: string
    msg: string
    path: string
    type: string
    value: string
}
type ErrorResponse = {
    error?: string
    message?: string
    errors?: ValidationError[]
}

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
        if(import.meta.env.DEV){
            console.group('Error getting accounts')            
        }
        if (isAxiosError(error)){
            if(error.response){
                if(import.meta.env.DEV){
                    console.log('status:', error.response.status)
                    console.log('response data:', error.response.data)
                    console.groupEnd()
                }
                //extract error message to throw
                const responseData = error.response.data as ErrorResponse
                let errorMessage: string
                if(responseData.errors && responseData.errors.length > 0){
                    errorMessage = responseData.errors[0].msg
                }else if(responseData.error){
                    errorMessage = responseData.error
                }else if(responseData.message){
                    errorMessage = responseData.message
                }else{
                    errorMessage = `Error ${error.response.status}: ${error.response.statusText}`
                }
                throw new Error(errorMessage) 
            }

            if(error.request){
                if(import.meta.env.DEV){
                    console.log('No response received')
                    console.groupEnd()
                }
                throw new Error('No se pudo conectar con el servidor')
            }
        }
        if(import.meta.env.DEV){
            console.log('Unknown error:', error)
            console.groupEnd()
        }
        throw new Error(error instanceof Error ? error.message : 'Error desconocido')
    }
}