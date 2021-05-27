const env = require('./env');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  timezone: env.timezone,
  define: {
    // Enforcing the table name to be equal to the model name
    freezeTableName: true,

    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // If don't want createdAt
    createdAt: false,
  
    // If don't want updatedAt
    updatedAt: false
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/user.model')(sequelize, Sequelize);
db.tutorials = require('../models/tutorial.model')(sequelize, Sequelize);
db.locations = require('../models/location.model')(sequelize, Sequelize);
db.locationtypes = require('../models/locationtype.model')(sequelize, Sequelize);
db.warehouses = require('../models/warehouse.model')(sequelize, Sequelize);


module.exports = db;