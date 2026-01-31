import { Router } from "express"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { TagController } from "../controllers/TagControllers"
import { generateSlug } from "../helpers"
import Tag from "../models/Tag"


//Account routes
const router = Router()

//POST tag
router.post('/',
    body('name')
    .notEmpty()
    .bail().
    isString()
    .trim()
    .isLength({min:2, max:30})
    .withMessage('Tag name must be between 2 and 30 characters')
    .custom(async (value) => {
        const slug = generateSlug(value)
        const existing = await Tag.findOne({slug})
        if(existing){
            throw new Error('Tag already exist')
        }
    }),
    body('variant').optional().isString().trim(),
    handleInputErrors,
    TagController.createTag
)

//GET all
router.get('/', TagController.getAllTags)

//GET by id
router.get('/:id',
    param('id').isMongoId().withMessage('invalid tag id'),
    handleInputErrors,
    TagController.getTagById
)

//PATCH update name & variant
router.patch('/:id',
    param('id').isMongoId().withMessage('invalid tag id'),
    body('name')
    .optional()
    .isString()
    .trim()
    .isLength({min:2, max:30})
    .withMessage('Tag name must be between 2 and 30 characters'),
    body('variant').optional().isString().trim(),
    handleInputErrors,
    TagController.updateTag
)

//DELETE tag
router.delete('/:id',
    param('id').isMongoId().withMessage('invalid tag id'),
    handleInputErrors,
    TagController.deleteTag
)

export default router