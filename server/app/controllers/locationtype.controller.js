const db = require('../config/db.config.js');
const LocationType = db.locationtypes;
const Op = db.Sequelize.Op;

// Retrieve all Location Type from the database.
exports.findAll = async (req, res) => {
    let locTypeName = req.query.LocationTypeName;

    var condition = locTypeName ? { LocationTypeName: { [Op.like]: `%${locTypeName}%` } } : null;
  
    await LocationType.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Location Type."
        });
    });
};

// Find a single Location Type with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await LocationType.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Location Type with id=" + id
        });
    });
};

// Create and Save a new Location Type
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.LocationTypeCode) {
      res.status(400).send({
        message: "LocationTypeCode can not be empty!"
      });
      return;
    }

    if (!req.body.LocationTypeName) {
        res.status(400).send({
          message: "LocationTypeName can not be empty!"
        });
        return;
      }
  
    // Create a Location Type
    var locationtype = {
        LocationTypeCode: req.body.LocationTypeCode,
        LocationTypeName: req.body.LocationTypeName,
        LocationTypeDesc1: req.body.LocationTypeDesc1,
        LocationTypeDesc2: req.body.LocationTypeDesc2,
        CompanyId: req.body.CompanyId,
        IsActive: req.body.IsActive,
        Created_UserId: req.body.Created_UserId
    };
  
    // Save Location Type in the database
    await LocationType.create(locationtype)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Location Type."
        });
      });
};

// Update a Location Type by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    await LocationType.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location Type was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Location Type with id=${id}. Maybe Location Type was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Location Type with id=" + id
        });
      });
};

// Delete a Location Type with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await LocationType.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location Type was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Location Type with id=${id}. Maybe Location Type was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Location Type with id=" + id
        });
      });
};