
export const MOVEMENT_TYPES = {
    income: {
        label: 'Ingreso',
    },
    expense: {
        label: 'Gasto',
    },
    deposit: {
        label: 'Depósito',
    },
    transfer: {
        label: 'Transferencia',
    },
} as const

export type MovementType = keyof typeof MOVEMENT_TYPES
