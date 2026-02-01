
export const TAG_COLORS = {
    V1: {
        text: 'text-sky-600',
        bg: 'bg-sky-400',
        selected: 'bg-sky-600'
    },
    V2: {
        text: 'text-red-600',
        bg: 'bg-red-400',
        selected: 'bg-red-100'
    },
    V3: {
        text: 'text-yellow-600',
        bg: 'bg-yellow-400',
        selected: 'bg-yellow-100'
    },
    V4: {
        text: 'text-violet-600',
        bg: 'bg-violet-400',
        selected: 'bg-violet-100'
    },
    V5: {
        text: 'text-green-600',
        bg: 'bg-green-400',
        selected: 'bg-green-100'
    },
    V6: {
        text: 'text-purple-600',
        bg: 'bg-purple-400',
        selected: 'bg-purple-100'
    },
    V7: {
        text: 'text-indigo-600',
        bg: 'bg-indigo-400',
        selected: 'bg-indigo-100'
    },
    V8: {
        text: 'text-blue-600',
        bg: 'bg-blue-400',
        selected: 'bg-blue-100'
    }
} as const

export type MovementType = keyof typeof TAG_COLORS