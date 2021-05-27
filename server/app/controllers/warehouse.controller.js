const db = require('../config/db.config.js');
const Warehouse = db.warehouses;
const Op = db.Sequelize.Op;

// Retrieve all Warehouse from the database.
exports.findAll = async (req, res) => {
    let whName = req.query.WarehouseName;

    var condition = whName ? { WarehouseName: { [Op.like]: `%${whName}%` } } : null;
  
    await Warehouse.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Warehouse."
        });
    });
};

// Find a single Warehouse with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Warehouse.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Warehouse with id=" + id
        });
    });
};

// Create and Save a new Warehouse
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.WarehouseCode) {
      res.status(400).send({
        message: "WarehouseCode can not be empty!"
      });
      return;
    }

    if (!req.body.WarehouseName) {
        res.status(400).send({
          message: "WarehouseName can not be empty!"
        });
        return;
      }
  
    // Create a warehouse
    var warehouse = {
        WarehouseCode: req.body.WarehouseCode,
        WarehouseName: req.body.WarehouseName,
        WarehouseDesc1: req.body.WarehouseDesc1,
        WarehouseDesc2: req.body.WarehouseDesc2,
        CompanyId: req.body.CompanyId,
        IsActive: req.body.IsActive,
        Created_UserId: req.body.Created_UserId
    };
  
    // Save Warehouse in the database
    await Warehouse.create(warehouse)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Warehouse."
        });
      });
};

// Update a Warehouse by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    await Warehouse.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Warehouse was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Warehouse with id=${id}. Maybe Warehouse was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Warehouse with id=" + id
        });
      });
};

// Delete a Warehouse with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Warehouse.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Warehouse was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Warehouse with id=${id}. Maybe Warehouse was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Warehouse with id=" + id
        });
      });
};

