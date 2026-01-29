
export const MOVEMENT_TYPES = {
    income: {
        label: 'Ingreso',
        color: 'text-green-balance',
        bg:'bg-green-balance-opaque'

    },
    expense: {
        label: 'Gasto',
        color: 'text-ritual-red',
        bg:'bg-ritual-red-opaque'
    },
    deposit: {
        label: 'Depósito',
        color: 'text-rice-paper',
        bg:'bg-gray-400'
    },
    withdrawal: {
        label: 'Retiro',
        color: 'text-obsidian',
        bg:'bg-linen-light'
    },
    transfer: {
        label: 'Transferencia',
        color: 'text-clay-gray',
        bg:'bg-clay-gray-opaque'
    },
} as const

export type MovementType = keyof typeof MOVEMENT_TYPES