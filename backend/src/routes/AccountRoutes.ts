import { Router } from "express"
import { body, param } from "express-validator"
import { accountTypesList} from "../types"
import { AccountController } from "../controllers/AccountControllers"
import { handleInputErrors } from "../middleware/validation"


//Account routes
const router = Router()

//POST account
router.post('/',
    body('name').notEmpty().bail().isIn(accountTypesList),
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