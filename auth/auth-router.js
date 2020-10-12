const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secret.js');

router.post('/register', (req, res) => {
	// implement registration
	let user = req.body;

	const hash = bcrypt.hash(user.password, 10);

	user.password = hash;

	Users.add(user)
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post('/login', (req, res) => {
	// implement login
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
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		role: user.role,
	};

	const secret = jwtSecret || 'another secret here';

	const options = {
		expiresIn: '1d',
	};

	const token = jwt.sign(payload, secret, options);

	return token;
}
module.exports = router;
