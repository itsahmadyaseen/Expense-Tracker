import Router from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createSharedExpense, deleteSharedExpense, getSharedExpenses } from '../controller/sharedExpense.controller.js';

const router = new Router();

router.route('/create-shared-expense').post(verifyJWT, createSharedExpense)
router.route('/get-shared-expense').get(verifyJWT, getSharedExpenses)
router.route('/delete-shared-expense/:id').delete(verifyJWT, deleteSharedExpense)

export default router;