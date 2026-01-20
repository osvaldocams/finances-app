import api from "../lib/axios"
import { movementListSchema, movementSchema, type Movement, type MovementDtoData } from "../types"
import { handleApiError } from "./handleApiError"


export async function createMovement(dtoData:MovementDtoData){
    try {
        const {data} = await api.post('/movements', dtoData)
        return data
    } catch (error) {
        //debugging logs for development only
        handleApiError(error, 'Error creating movement', dtoData)
    }
}

export async function getMovements(){
    try {
        const {data} = await api.get('/movements')
        const response = movementListSchema.safeParse(data)
        if(!response.success){
            if(import.meta.env.DEV){
                console.log('validation error:', response.error.format())
            }
            throw new Error('Error showing movements')
        }
        return response.data
    } catch (error) {
        //debugging logs for development only
        handleApiError(error, 'Error fetching movements')
    }
}

export async function getMovementById(id:Movement['_id']):Promise<Movement>{
    try {
        const {data} = await api.get(`/movements/${id}`)
        const response = movementSchema.safeParse(data)
        if(!response.success){
            if(import.meta.env.DEV){
                console.log('validation error:', response.error.format())
            }
            throw new Error('The movement data is not in the expected format')
        }
        return response.data
    } catch (error) {
        //debugging logs for development only
        handleApiError(error, 'Error fetching movement', {id})
    }
}
export async function deleteMovement(id:Movement['_id']):Promise<Movement>{
    try {
        const {data} = await api.delete(`/movements/${id}`)
        return data
    } catch (error) {
        //debugging logs for development only
        handleApiError(error, 'Error deleting movement', {id})
    }
}