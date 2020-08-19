const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConfig = require('../data/db-config');

const router = require('express').Router();

const db = require('../data/db-config.js');

router.post('/signup', (req, res) => {
    const info = req.body;

    const rounds = process.env.BCRYPT_ROUNDS || 5;

    const hash = bcryptjs.hashSync(info.password, rounds);

    info.password = hash;

    db('users').insert(info).returning('userId')
        .then(([ids]) => {
            db('users').select('userId', 'username', 'accountType').where({ userId: ids })
                .then(user => {
                    res.status(201).json(user);
                })
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while adding this user" });
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db('users').where({ username: username })
        .then(([user]) => {
            if(user && bcryptjs.compareSync(password, user.password)) {
                const token = signToken(user);

                res.status(200).json({ message: 'henlo', token });
            }
            else {
                res.status(401).json({ message: "hecking wrong" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destr(error => {
            if(error) {
                res.status(500).json({ error: "Something went wrong whilte trying to log you out" });
            }
            else {
                res.status(204).json(`logged out`);
            }
        })
    }
    else {
        res.status(200).json({ message: "Please login to logout" });
    }
});

function signToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        accountType: user.accountType
    };

    const secret = process.env.JWT_SECRET || 'hecc';

    const options = {
        expiresIn: '.5d'
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;