import mongoose, {Schema, Document} from "mongoose"
import { AccountType, accountTypesList } from "../types";


export interface IAccount extends Document {
    name: AccountType
    balance: number
}

const AccountSchema: Schema = new Schema({
    name: {
        type: String,
        enum: accountTypesList,
        required: true,
        unique: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    }
})
const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
