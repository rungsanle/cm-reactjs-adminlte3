const db = require('../config/db.config');
const User = db.users;
const Op = db.Sequelize.Op;

// Retrieve all User from the database.
exports.findAll = async (req, res) => {
    let userName = req.query.UserName;

    var condition = userName ? { UserName: { [Op.like]: `%${userName}%` } } : null;
  
    await User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
    });
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
    });
};

// Create and Save a new User
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.UserCode) {
      res.status(400).send({
        message: "UserCode can not be empty!"
      });
      return;
    }

    if (!req.body.UserName) {
        res.status(400).send({
          message: "UserName can not be empty!"
        });
        return;
      }
  
    // Create a User
    var user = {
        UserCode: req.body.UserCode,
        UserName: req.body.UserName,
        UserLogin: req.body.UserLogin,
        UserPassword: req.body.UserPassword,
        IsActive: req.body.IsActive,
        Created_UserId: req.body.Created_UserId
    };
  
    // Save User in the database
    await User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    await User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};