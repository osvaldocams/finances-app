import {z} from 'zod'
import {MOVEMENT_TYPES} from '../constants/movementTypes'

/*Movements*/
export const movementSchema = z.object({
    _id: z.string(),
    type: z.enum(Object.keys(MOVEMENT_TYPES) as [keyof typeof MOVEMENT_TYPES, ...string[]], {
        message: "Selecciona un tipo de movimiento"
    }),
    date: z.string(),//ISO string
    amount: z.number().positive(),
    description: z.string().optional(),
    incomeAccount: z.string().optional(),
    expenseAccount: z.string().optional(),
    tags: z.array(z.string())
})

export type Movement = z.infer<typeof movementSchema>

/***************/

/*Movement Form*/
const movementFormInputSchema = z.object({
    type: z.string(),
    date: z.string(),
    amount: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    incomeAccount: z.string().optional(),
    expenseAccount: z.string().optional(),
    tags: z.array(z.string()).optional()
})

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
        incomeAccount: data.incomeAccount === '' ? undefined : data.incomeAccount ?? undefined,
        expenseAccount: data.expenseAccount === '' ? undefined : data.expenseAccount ?? undefined,
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
            incomeAccount: z.string().or(z.undefined()),
            expenseAccount: z.string().or(z.undefined()),
            tags: z.array(z.string())
        }).superRefine((data, ctx) => {
            if(data.type === 'income' && !data.incomeAccount){
                ctx.addIssue({
                    path: ['incomeAccount'],
                    message: 'la cuenta de ingresos es obligatoria',
                    code: z.ZodIssueCode.custom
                })
            }
            if(data.type === 'expense' && !data.expenseAccount){
                ctx.addIssue({
                    path: ['expenseAccount'],
                    message: 'la cuenta de egresos es obligatoria',
                    code: z.ZodIssueCode.custom
                })
            }
            if(['transfer', 'deposit'].includes(data.type)){
                if (!data.incomeAccount || !data.expenseAccount){
                    ctx.addIssue({
                        path: ['incomeAccount'],
                        message: 'Se requieren ambas cuentas',
                        code: z.ZodIssueCode.custom,
                    })
                }
            }
            if(data.amount === undefined){
                ctx.addIssue({
                    path: ['amount'],
                    message: 'El monto es obligatorio',
                    code: z.ZodIssueCode.custom
                })
            }
        }  )
)

export const movementDtoSchema = movementFormSchema.transform((data)=>(
    Object.fromEntries(
        Object.entries(data).filter(
            ([_,value])=> value !== undefined
        )
    )
))

export type MovementFormInputs = z.input<typeof movementFormSchema>
export type MovementFormData = z.output<typeof movementFormSchema>
export type MovementDtoData = z.infer<typeof movementDtoSchema>