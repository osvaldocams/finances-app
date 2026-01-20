import {z} from 'zod'
import {MOVEMENT_TYPES} from '../constants/movementTypes'

/*Accounts*/
export const accountKindSchema = z.enum(['cash', 'bank'])

export const accountSchema = z.object({
    _id: z.string(),
    name: z.string(),
    kind: accountKindSchema,
    balance: z.number()
})
export const accountListSchema = z.array(accountSchema)

export type Account = z.infer<typeof accountSchema>
export type AccountList = z.infer<typeof accountListSchema>
/***************/

/*Movements*/
//API respose
export const movementSchema = z.object({
    _id: z.string(),
    type: z.enum(Object.keys(MOVEMENT_TYPES) as [keyof typeof MOVEMENT_TYPES, ...string[]], {
        message: "Selecciona un tipo de movimiento"
    }),
    date: z.string(),//ISO string
    amount: z.coerce.number(),
    description: z.string().optional(),
    incomeAccount: accountSchema.optional(),
    expenseAccount: accountSchema.optional(),
    tags: z.array(z.string())
})
export const movementListSchema = z.array(movementSchema)

export type MovementList = z.infer<typeof movementListSchema>
export type Movement = z.infer<typeof movementSchema>

//Form validation
/*Movement Form*/
const movementFormInputSchema = z.object({
    type: z.string(),
    date: z.string(),
    amount: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    incomeAccountId: z.string().optional(),
    expenseAccountId: z.string().optional(),
    tags: z.array(z.string()).optional()
})
export type MovementFormInputs = z.input<typeof movementFormSchema>

export const movementFormSchema = movementFormInputSchema
    .transform((data) => ({
        type: data.type,
        date: data.date,
        amount: data.amount === '' || data.amount === null || data.amount === undefined
            ? undefined
            : typeof data.amount === 'string'
                ? Number(data.amount)
                : data.amount,
        description: data.description ?? undefined,
        incomeAccountId: data.incomeAccountId === '' ? undefined : data.incomeAccountId ?? undefined,
        expenseAccountId: data.expenseAccountId === '' ? undefined : data.expenseAccountId ?? undefined,
        tags: data.tags ?? []
    }))
    .pipe(
        z.object({
            type: z.string()
                .min(1, 'selecciona un tipo de movimiento')
                .refine(
                    (val) => Object.keys(MOVEMENT_TYPES).includes(val), 
                    {message: "Selecciona un tipo de movimiento válido"}
                ),
            date: z.string(),
            amount: z.number().positive({message: 'El monto debe ser mayor a cero'}).or(z.undefined()),
            description: z.string().or(z.undefined()),
            incomeAccountId: z.string().or(z.undefined()),
            expenseAccountId: z.string().or(z.undefined()),
            tags: z.array(z.string())
        }).superRefine((data, ctx) => {
            if(data.amount === undefined){
                ctx.addIssue({
                    path: ['amount'],
                    message: 'El monto es obligatorio',
                    code: z.ZodIssueCode.custom
                })
            }
            if(data.type === 'income' && !data.incomeAccountId){
                ctx.addIssue({
                    path: ['incomeAccountId'],
                    message: 'la cuenta de ingresos es obligatoria',
                    code: z.ZodIssueCode.custom
                })
            }
            if(data.type === 'expense' && !data.expenseAccountId){
                ctx.addIssue({
                    path: ['expenseAccountId'],
                    message: 'la cuenta de egresos es obligatoria',
                    code: z.ZodIssueCode.custom
                })
            }
            if(['transfer', 'deposit', 'withdrawal'].includes(data.type)){
                if (!data.incomeAccountId ){
                    ctx.addIssue({
                        path: ['incomeAccountId'],
                        message: 'La cuenta de ingresos es obligatoria',
                        code: z.ZodIssueCode.custom,
                    })
                }
                if(!data.expenseAccountId){
                    ctx.addIssue({
                        path: ['expenseAccountId'],
                        message: 'La cuenta de egresos es obligatoria',
                        code: z.ZodIssueCode.custom,
                    })
                }
            }
            if(
                data.type === 'transfer' && 
                data.incomeAccountId && 
                data.expenseAccountId && 
                data.incomeAccountId === data.expenseAccountId
            ){
                ctx.addIssue({
                    path:['expenseAccountId'],
                    message: 'La cuenta origen y destino no pueden ser la misma',
                    code: z.ZodIssueCode.custom
                })
            }
        }  )
)
export type MovementFormData = z.output<typeof movementFormSchema>

//Payload to send to API
export const movementDtoSchema = movementFormSchema.transform((data)=>(
    Object.fromEntries(
        Object.entries(data).filter(
            ([_,value])=> value !== undefined
        )
    )
))
export type MovementDtoData = z.infer<typeof movementDtoSchema>