import { Router } from "express"
import { MovementController } from "../controllers/MovementControllers"
import { body, param } from "express-validator"
import { handleInputErrors, normalizeAmount, validateMovementLogic } from "../middleware/validation"
import {movementTypesList} from "../types"

const router = Router()


//Movement routes
//post movement
router.post('/',
    body('type')
        .notEmpty()
        .bail()
        .isIn(movementTypesList)
        .withMessage(`Type must be one of: ${movementTypesList.join(', ')}`),
    body('amount')
        .notEmpty()
        .bail()
        .isNumeric()
        .withMessage('Amount must be a number')
        .toFloat(),
    body('description')
        .notEmpty()
        .bail()
        .isString()
        .trim(),
    body('date')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
        .toDate(),
    body('incomeAccountId')
        .optional()
        .isMongoId()
        .withMessage('income account must be a valid account id'),
    body('expenseAccountId')
        .optional()
        .isMongoId()
        .withMessage('expense account must be a valid account id'),
    handleInputErrors,
    validateMovementLogic,
    normalizeAmount,
    MovementController.createMovement
)

//get all movement
router.get('/', MovementController.getAllMovements)

//get movement by id
router.get('/:id', 
    param('id')
    .isMongoId()
    .withMessage('invalid movement id'),
    handleInputErrors,
    MovementController.getMovementById
)

//delete movement
router.delete('/:id',
    param('id')
    .isMongoId()
    .withMessage('invalid movement id'),
    handleInputErrors,
    MovementController.deleteMovement
)

//post add tag by movementId
router.post('/:movementId/tags/:tagId',
    param('movementId').isMongoId().withMessage('invalid movement id'),
    param('tagId').isMongoId().withMessage('invalid tag id'),
    handleInputErrors,
    MovementController.addTagToMovement
)

//delete remove tag from movement
router.delete('/:movementId/tags/:tagId',
    param('movementId').isMongoId().withMessage('invalid movement id'),
    param('tagId').isMongoId().withMessage('invalid tag id'),
    handleInputErrors,
    MovementController.removeTagFromMovement
)

export default router