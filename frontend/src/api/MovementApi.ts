import { isAxiosError } from "axios"
import api from "../lib/axios"
import { movementListSchema, type MovementDtoData } from "../types"

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

export async function createMovement(dtoData:MovementDtoData){
    try {
        const {data} = await api.post('/movements', dtoData)
        return data
    } catch (error) {
        //debugging logs for development only
        if(import.meta.env.DEV){
            console.group('Error creating movement')
            console.log('data sent:', dtoData)
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

export async function getMovements(){
    try {
        const {data} = await api.get('/movements')
        const response = movementListSchema.safeParse(data)
        if(!response.success){
            throw new Error('Error al mostrar los movimientos')
        }
        return response.data
    } catch (error) {
        //debugging logs for development only
        if(import.meta.env.DEV){
            console.group('Error fetching movements')
            console.log('No data sent')
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