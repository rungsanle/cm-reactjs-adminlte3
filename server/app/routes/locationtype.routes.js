const fnc = require("../util/functions");

module.exports = app => {

    const locationtypes = require("../controllers/locationtype.controller.js");

    var router = require('express').Router();

    // Retrieve all LocationTypes
    router.get("/", fnc.verifyToken, locationtypes.findAll);

    // Retrieve a single LocationType with id
    router.get("/:id", fnc.verifyToken, locationtypes.findOne);

    // Create a new LocationType
    router.post("/", fnc.verifyToken, locationtypes.create);

    // Update a LocationType with id
    router.put("/:id", fnc.verifyToken, locationtypes.update);

    // Delete a LocationType with id
    router.delete("/:id", fnc.verifyToken, locationtypes.delete);

    app.use('/api/locationtypes', router);

};