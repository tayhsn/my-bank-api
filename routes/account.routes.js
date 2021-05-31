import express from 'express';
import AccountController from '../controllers/account.controller.js';

const router = express.Router();

router.post('/', AccountController.createAccount);
router.get('/', AccountController.getAccounts);
router.get('/:id', AccountController.getAccount);
router.delete('/:id', AccountController.deleteAccount);
router.put('/', AccountController.updateAccount);
router.patch('/updateBalance', AccountController.updateBalance);

router.use((err, req, res, next) => {
	logger.error(`${err.message}`);
	res.status(400).send({ error: err.message });
});

export default router;
