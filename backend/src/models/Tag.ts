import mongoose, {Schema, Document} from "mongoose"
import { generateSlug } from "../helpers"

const TAG_VARIANTS = [
    'V1', 
    'V2', 
    'V3', 
    'V4', 
    'V5', 
    'V7', 
    'V8'  
]

export interface ITag extends Document {
    name: string
    slug: string
    user?: mongoose.Types.ObjectId
    variant?: string
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
    variant: { 
        type: String,
        enum: TAG_VARIANTS,
        default: function(){
            return TAG_VARIANTS[Math.floor(Math.random() * TAG_VARIANTS.length)]
        },
        trim: true
    },
},{ timestamps: true })

TagSchema.pre<ITag>('validate', function(){
    if(!this.slug && this.name){
        this.slug = generateSlug(this.name)
    }
})

TagSchema.pre<ITag>('save', function(){
    if(!this.isModified('name')){
        return
    }
    this.slug = generateSlug(this.name)
})

const Tag = mongoose.model<ITag>('Tag', TagSchema);
export default Tag;