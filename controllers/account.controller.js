import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

async function createAccount(req, res, next) {
	try {
		let account = req.body;

		if (!account.name || account.balance == null) {
			throw new Error('Name and Balance are required.');
		}

		const data = JSON.parse(await readFile(fileName));

		account = {
			id: data.nextId++,
			name: account.name,
			balance: account.balance,
		};
		data.accounts.push(account);

		await writeFile(fileName, JSON.stringify(data, null, 2));
		res.send(account);

		logger.info(`POST /account - ${JSON.stringify(account)}`);
	} catch (err) {
		next(err);
	}
}

async function getAccounts(req, res, next) {
	try {
		const data = JSON.parse(await readFile(fileName));
		delete data.nextId;
		res.send(data);

		logger.info('GET /account');
	} catch (err) {
		next(err);
	}
}

async function getAccount(req, res, next) {
    try {
		const data = JSON.parse(await readFile(fileName));
		const account = data.accounts.find(
			(account) => account.id === parseInt(req.params.id),
		);
		res.send(account);
		logger.info('GET /account/:id');
	} catch (err) {
		next(err);
	}
}

async function deleteAccount(req, res, next) {
	try {
		const data = JSON.parse(await readFile(fileName));

		data.accounts = data.accounts.filter(
			(account) => account.id !== parseInt(req.params.id),
		);

		await writeFile(fileName, JSON.stringify(data, null, 2));
		res.end();

		logger.info(`DELETE /account - ${req.params.id}`);
	} catch (err) {
		next(err);
	}
}

async function updateAccont(req, res, next) {
    try {
		const account = req.body;

		if (!account.id || !account.name || account.balance == null) {
			throw new Error('ID, Name and Balance are required.');
		}

		const data = JSON.parse(await readFile(fileName));
		const index = data.accounts.findIndex((a) => a.id === account.id);

		if (index === -1) {
			throw new Error('Data not found.');
		}

		data.accounts[index].name = account.name;
		data.accounts[index].balance = account.balance;

		await writeFile(fileName, JSON.stringify(data, null, 2));
		res.send(account);

		logger.info(`PUT /account - ${JSON.stringify(account)}`);
	} catch (err) {
		next(err);
	}
}

async function updateBalance(req, res, next) {
    try {
		const account = req.body;
		const data = JSON.parse(await readFile(fileName));
		const index = data.accounts.findIndex((a) => a.id === account.id);

		if (!account.id || account.balance == null) {
			throw new Error('ID and Balance are required.');
		}

		if (index === -1) {
			throw new Error('Data not found.');
		}

		data.accounts[index].balance = account.balance;
		await writeFile(fileName, JSON.stringify(data));
		res.send(data.accounts[index]);

		logger.info(
			`PATCH /account/updateBalance - ${JSON.stringify(account)}`,
		);
	} catch (err) {
		next(err);
	}
}

export default { createAccount, getAccounts, getAccount, deleteAccount, updateAccont, updateBalance };