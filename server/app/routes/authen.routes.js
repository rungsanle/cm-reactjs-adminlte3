module.exports = app => {

    const authen = require('../controllers/authen.controller');

    var router = require('express').Router();

    router.post('/', authen.login);

    app.use('/api/authen/login', router);
};
