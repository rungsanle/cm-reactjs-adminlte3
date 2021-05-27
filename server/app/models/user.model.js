module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        UserCode: {
            type: Sequelize.STRING
        },
        UserName: {
            type: Sequelize.STRING
        },
        UserLogin: {
            type: Sequelize.STRING
        },
        UserPassword: {
            type: Sequelize.STRING
        },
        IsActive: {
            type: Sequelize.BOOLEAN
        },
        Created_UserId: {
            type: Sequelize.BIGINT(11)
        },
        Created_Date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
        },
        Updated_UserId: {
            type: Sequelize.BIGINT(11)
        },
        Updated_Date: {
            type: Sequelize.DATE 
        }
    });
  
    return User;
  };