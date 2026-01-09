

export const movementTypesList = ['income', 'expense', 'deposit', 'withdrawal', 'transfer'] as const
export type MovementType = typeof movementTypesList[number]

export const accountKinds = ['cash', 'bank'] as const
export type AccountKind = typeof accountKinds[number]


export type MovementBody = {
    type: MovementType
    date: Date
    amount: number
    description: string
    incomeAccountId: string
    expenseAccountId: string
}

export type CreateAccountBody = {
    name: string
    kind: AccountKind
}