const fnc = require("../util/functions");

module.exports = app => {

    const users = require('../controllers/user.controller');

    var router = require('express').Router();

    // Retrieve all User
    router.get("/", fnc.verifyToken, users.findAll);

    // Retrieve a single User with id
    router.get("/:id", fnc.verifyToken, users.findOne);

    // Create a new User
    router.post("/", fnc.verifyToken, users.create);

    // Update a User with id
    router.put("/:id", fnc.verifyToken, users.update);

    // Delete a User with id
    router.delete("/:id", fnc.verifyToken, users.delete);

    app.use('/api/users', router);

};