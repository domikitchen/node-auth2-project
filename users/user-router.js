const router = require('express').Router();

const db = require('../data/db-config.js');
const protected = require('../auth/protected-mw.js');

router.get('/', protected, (req, res) => {
    db('users').join('accountTypes', 'accountTypes.typeId', "=", 'users.accountType').select('users.userId', 'users.username', 'accountTypes.name as accountType')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while retrieving the user list" });
        });
});

module.exports = router;