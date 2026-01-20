// src/utils/apiErrorHandler.ts
import { isAxiosError } from "axios"

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

export function handleApiError(error: unknown, context: string, sentData?: any): never {
    // Debugging logs for development only
    if (import.meta.env.DEV) {
        console.group(`🔴 ${context}`)
        if (sentData) console.log('Data sent:', sentData)
    }

    if (isAxiosError(error)) {
        if (error.response) {
            if (import.meta.env.DEV) {
                console.log('Status:', error.response.status)
                console.log('Response data:', error.response.data)
                console.groupEnd()
            }

            const responseData = error.response.data as ErrorResponse
            
            // Extract error message
            const errorMessage = 
                responseData.errors?.[0]?.msg ||
                responseData.error ||
                responseData.message ||
                `Error ${error.response.status}: ${error.response.statusText}`
            
            throw new Error(errorMessage)
        }

        if (error.request) {
            if (import.meta.env.DEV) {
                console.log('No response received')
                console.groupEnd()
            }
            throw new Error('No se pudo conectar con el servidor')
        }
    }

    if (import.meta.env.DEV) {
        console.log('Unknown error:', error)
        console.groupEnd()
    }

    throw new Error(error instanceof Error ? error.message : 'Error desconocido')
}