import mongoose, {Schema, Document} from "mongoose"
import { generateSlug } from "../helpers"

const TAG_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#FACC15', // yellow
  '#22C55E', // green
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899'  // pink
]

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
        enum: TAG_COLORS,
        default: function(){
            return TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]
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