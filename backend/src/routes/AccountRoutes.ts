import { Router } from "express"
import { body, param } from "express-validator"
import { AccountController } from "../controllers/AccountControllers"
import { handleInputErrors } from "../middleware/validation"
import { accountKinds } from "../types"


//Account routes
const router = Router()

//POST account
router.post('/',
    body('name')
    .notEmpty()
    .withMessage('account name is required')
    .isString()
    .withMessage('account name must be a string'),
    
    body('kind')
    .notEmpty()
    .withMessage('account kind is required')
    .isIn(accountKinds)
    .withMessage(`account kind must be one of the following values: cash, bank`),

    body('balance')
    .optional()
    .isNumeric()
    .withMessage('balance must be a number')
    .custom(value => value >= 0)
    .withMessage('balance must be greater than or equal to 0'),
    handleInputErrors,
    AccountController.createAccount
)

//GET all accounts
router.get('/',
    AccountController.getAllAccounts
)

//GET account by id
router.get('/:id', 
    param('id')
    .isMongoId()
    .withMessage('invalid account id'),
    handleInputErrors,
    AccountController.getAccountById
)

export default router