import mongoose, {Schema, Document} from "mongoose"
import { MovementType, movementTypesList} from "../types";

export interface IMovement extends Document {
    type: MovementType
    date: Date
    amount: number
    description: string
    incomeAccount?: mongoose.Types.ObjectId
    expenseAccount?: mongoose.Types.ObjectId
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account",
        required: function (){return ['income', 'transfer', 'deposit'].includes(this.type)} 
    },
    expenseAccount: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account",
        required: function (){return ['expense', 'transfer'].includes(this.type)} 
    },
},{ timestamps: true });

// MovementSchema.pre(/^find/, function(this:mongoose.Query<any,any>, next:any) {
//     const query = this
//     query.populate('incomeAccount').populate('expenseAccount')
//     next(undefined)
// });

const Movement = mongoose.model<IMovement>('Movement', MovementSchema);
export default Movement;

