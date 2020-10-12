const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret.js');

router.post('/register', (req, res) => {
	let user = req.body;

	const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
	user.password = hash;

	Users.add(user)
		.then((saved) => {
			res.status(201).json({ message: 'Registered with success!' });
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message: `Welcome ${user.username}!`,
					token: token,
				});
			} else {
				res.status(401).json({ message: 'You shall not pass!' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		lat: Date.now(),
	};

	const options = {
		expiresIn: '1d',
	};

	const token = jwt.sign(payload, jwtSecret, options);

	return token;
}

module.exports = router;
