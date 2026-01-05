import mongoose, {Schema, Document} from "mongoose"
import { accountKinds } from "../types"


export interface IAccount extends Document {
    name: string
    kind: 'cash'|'bank'
    balance: number
}

const AccountSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    kind: {
        type: String,
        enum: accountKinds,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
},{timestamps: true})


const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
