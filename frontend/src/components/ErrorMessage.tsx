
import { AlertCircle } from 'lucide-react'

type ErrorMessageProps = {
    message?: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null
    
    return (
        <div className="flex items-center gap-2 mt-1 text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="text-sm">{message}</p>
        </div>
    )
}