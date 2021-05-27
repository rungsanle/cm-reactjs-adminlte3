const db = require('../config/db.config.js');
const Location = db.locations;
const Op = db.Sequelize.Op;

// Retrieve all Location from the database.
exports.findAll = async (req, res) => {
    let locName = req.query.LocationName;

    var condition = locName ? { title: { [Op.like]: `%${locName}%` } } : null;
  
    await Location.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Location."
        });
    });
};

// Find a single Location with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Location.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Location with id=" + id
        });
    });
};

// Create and Save a new Location
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.LocationCode) {
      res.status(400).send({
        message: "LocationCode can not be empty!"
      });
      return;
    }

    if (!req.body.LocationName) {
        res.status(400).send({
          message: "LocationName can not be empty!"
        });
        return;
      }
  
    // Create a location
    var location = {
        LocationCode: req.body.LocationCode,
        LocationName: req.body.LocationName,
        LocationDesc1: req.body.LocationDesc1,
        LocationDesc2: req.body.LocationDesc2,
        LocationTypeId: req.body.LocationTypeId,
        WarehouseId: req.body.WarehouseId,
        CompanyId: req.body.CompanyId,
        IsActive: req.body.IsActive,
        Created_UserId: req.body.Created_UserId
    };
  
    // Save Location in the database
    await Location.create(location)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Location."
        });
      });
};

// Update a Location by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    await Location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Location with id=" + id
        });
      });
};

// Delete a Location with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Location.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Location with id=${id}. Maybe Location was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Location with id=" + id
        });
      });
};





