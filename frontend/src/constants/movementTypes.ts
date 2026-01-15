
export const MOVEMENT_TYPES = {
    income: {
        label: 'Ingreso',
        color: 'text-green-600'
    },
    expense: {
        label: 'Gasto',
        color: 'text-red-600'
    },
    deposit: {
        label: 'Depósito',
        color: 'text-violet-600'
    },
    withdrawal: {
        label: 'Retiro',
        color: 'text-rose-400'
    },
    transfer: {
        label: 'Transferencia',
        color: 'text-blue-600'
    },
} as const

export type MovementType = keyof typeof MOVEMENT_TYPES