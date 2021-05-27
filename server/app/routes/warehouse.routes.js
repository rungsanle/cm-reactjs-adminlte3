const fnc = require("../util/functions");

module.exports = app => {

    const warehouses = require("../controllers/warehouse.controller.js");

    var router = require('express').Router();

    // Retrieve all Locations
    router.get("/", fnc.verifyToken, warehouses.findAll);

    // Retrieve a single Location with id
    router.get("/:id", fnc.verifyToken, warehouses.findOne);

    // Create a new Location
    router.post("/", fnc.verifyToken, warehouses.create);

    // Update a Location with id
    router.put("/:id", fnc.verifyToken, warehouses.update);

    // Delete a Location with id
    router.delete("/:id", fnc.verifyToken, warehouses.delete);

    app.use('/api/warehouses', router);

};