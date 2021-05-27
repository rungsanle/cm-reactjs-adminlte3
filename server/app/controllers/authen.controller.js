const env = require('../config/env');
const db = require('../config/db.config');
const jwt = require('jsonwebtoken');
const UserAuthen = db.users;
const Op = db.Sequelize.Op;

// Find a single User with UserLogin and UserPassword
exports.login = async (req, res) => {

    const userLogin = req.body.UserLogin;
    const userPassword = req.body.UserPassword;

    console.log("user login " + userLogin);

    var condition = { UserLogin: userLogin, UserPassword: userPassword };

    await UserAuthen.findOne({where: condition})
        .then(user => {
            if (user) {
                jwt.sign({user}, env.secretkey, { expiresIn: '1d' }, (err, token) => {
                    res.json({user, token});
                });
            } else {
                // Forbidden
                res.sendStatus(403);
            }
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || " Some error occurred while user authentication"
            });
          });
};