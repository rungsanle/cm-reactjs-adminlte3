const fnc = require("../util/functions");

module.exports = app => {

    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", fnc.verifyToken, tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", fnc.verifyToken, tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", fnc.verifyToken, tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", fnc.verifyToken, tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", fnc.verifyToken, tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", fnc.verifyToken, tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
    
  };