
export const MOVEMENT_TYPES = {
    income: {
        label: 'Ingreso',
        color: 'text-green-700',
        bg:'bg-green-200'

    },
    expense: {
        label: 'Gasto',
        color: 'text-red-700',
        bg:'bg-red-200'
    },
    deposit: {
        label: 'Depósito',
        color: 'text-violet-700',
        bg:'bg-violet-200'
    },
    withdrawal: {
        label: 'Retiro',
        color: 'text-rose-400',
        bg:'bg-rose-100'
    },
    transfer: {
        label: 'Transferencia',
        color: 'text-blue-700',
        bg:'bg-blue-200'
    },
} as const

export type MovementType = keyof typeof MOVEMENT_TYPES