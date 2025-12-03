import mongoose, {Schema, Document} from "mongoose"

const movementTypesList = ['income', 'expense', 'deposit', 'transfer'] as const
export type MovementType = typeof movementTypesList[number]


const accountTypesList = ['CASH', 'BBVA', 'AZTECA', 'MERCADOPAGO'] as const
export type AccountType = typeof accountTypesList[number]


export interface IMovement extends Document {
    type: MovementType
    date: Date
    amount: number
    description: string
    incomeAccount?: AccountType
    expenseAccount?: AccountType
}

const MovementSchema: Schema = new Schema({
    type: { 
        type: String, 
        enum: movementTypesList,
        required: true,
        trim: true
    },
    
    date: { 
        type: Date, 
        default: Date.now 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    incomeAccount: { 
        type: String, 
        enum: accountTypesList,  
        required: false 
    },
    expenseAccount: { 
        type: String, 
        enum: accountTypesList, 
        required: false 
    },
},{ timestamps: true });
const Movement = mongoose.model<IMovement>('Movement', MovementSchema);
export default Movement;
