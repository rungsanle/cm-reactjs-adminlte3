const env = {
    database: 'nodedbtest',
    username: 'root',
    password: 'dbaadmin',
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    secretkey: 'secretkey1234',
    charset: 'utf8',
    timezone: '+07:00'
  };

  module.exports = env;