import AccountService from '../services/account.service.js';

async function createAccount(req, res, next) {
	try {
		let account = req.body;

		if (!account.name || account.balance == null) {
			throw new Error('Name and Balance are required.');
		}

		account = await AccountService.createAccount(account);
		res.send(account);

		logger.info(`POST /account - ${JSON.stringify(account)}`);
	} catch (err) {
		next(err);
	}
}

async function getAccounts(req, res, next) {
	try {
		const data = await AccountService.getAccounts();
		res.send(data);

		logger.info('GET /account');
	} catch (err) {
		next(err);
	}
}

async function getAccount(req, res, next) {
	try {
		const account = await AccountService.getAccount(req.paramsid);
		res.send(account);
		logger.info('GET /account/:id');
	} catch (err) {
		next(err);
	}
}

async function deleteAccount(req, res, next) {
	try {
		await AccountService.deleteAccount(req.params.id);
		res.end();

		logger.info(`DELETE /account - ${req.params.id}`);
	} catch (err) {
		next(err);
	}
}

async function updateAccont(req, res, next) {
	try {
		let account = req.body;

		if (!account.id || !account.name || account.balance == null) {
			throw new Error('ID, Name and Balance are required.');
		}

		account = await AccountService.updateAccont(account);

		res.send(account);

		logger.info(`PUT /account - ${JSON.stringify(account)}`);
	} catch (err) {
		next(err);
	}
}

async function updateBalance(req, res, next) {
	try {
		let account = req.body;

		if (!account.id || account.balance == null) {
			throw new Error('ID and Balance are required.');
		}

		account = await AccountService.updateBalance(account);
		res.send(account);

		logger.info(
			`PATCH /account/updateBalance - ${JSON.stringify(account)}`,
		);
	} catch (err) {
		next(err);
	}
}

export default {
	createAccount,
	getAccounts,
	getAccount,
	deleteAccount,
	updateAccont,
	updateBalance,
};
