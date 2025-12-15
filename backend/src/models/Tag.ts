import mongoose, {Schema, Document} from "mongoose"
import { generateSlug } from "../helpers"

export interface ITag extends Document {
    name: string
    slug: string
    user?: mongoose.Types.ObjectId
    color?: string
    createdAt: Date
    updatedAt: Date
}

const TagSchema: Schema = new Schema<ITag>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        index: true
    },
    
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false //provisionally 
    },
    color: { 
        type: String,
        trim: true
    },
},{ timestamps: true })

TagSchema.pre<ITag>('save', function(next: (err?:mongoose.CallbackError | Error)=> void){
    if(!this.isModified('name')){
        return next()
    }
    this.slug = generateSlug(this.name)
    next()
})

const Tag = mongoose.model<ITag>('Tag', TagSchema);
export default Tag;