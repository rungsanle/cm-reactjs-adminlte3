const fnc = require("../util/functions");

module.exports = app => {

    const locations = require("../controllers/location.controller.js");

    var router = require('express').Router();

    // Retrieve all Locations
    router.get("/", fnc.verifyToken, locations.findAll);

    // Retrieve a single Location with id
    router.get("/:id", fnc.verifyToken, locations.findOne);

    // Create a new Location
    router.post("/", fnc.verifyToken, locations.create);

    // Update a Location with id
    router.put("/:id", fnc.verifyToken, locations.update);

    // Delete a Location with id
    router.delete("/:id", fnc.verifyToken, locations.delete);

    app.use('/api/locations', router);

};