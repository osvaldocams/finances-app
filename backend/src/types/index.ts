

export const movementTypesList = ['income', 'expense', 'deposit', 'transfer'] as const
export type MovementType = typeof movementTypesList[number]


export const accountTypesList = ['CASH', 'BBVA', 'AZTECA', 'MERCADOPAGO'] as const
export type AccountType = typeof accountTypesList[number]

export type MovementBody = {
    type: MovementType
    date: Date
    amount: number
    description: string
    incomeAccount: AccountType
    expenseAccount: AccountType
}