import api from "../lib/axios"
import { tagListSchema } from "../types"
import { handleApiError } from "./handleApiError"


export async function getTags(){
    try {
        const {data} = await api.get('/tag')
        const response = tagListSchema.safeParse(data)
        if(!response.success){
            if(import.meta.env.DEV){
                console.log('validation error:', response.error.format())
            }
            throw new Error('Error showing tags')
        }
        return response.data
    } catch (error) {
        //debugging logs for development only
        handleApiError(error, 'Error fetching tags')
    }
}