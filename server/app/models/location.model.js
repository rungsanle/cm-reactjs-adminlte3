module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
        LocationCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        LocationName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        LocationDesc1: {
            type: Sequelize.STRING
        },
        LocationDesc2: {
            type: Sequelize.STRING
        },
        LocationTypeId: {
            type: Sequelize.BIGINT(11)
        },
        WarehouseId: {
            type: Sequelize.BIGINT(11)
        },
        CompanyId: {
            type: Sequelize.BIGINT(11)
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

    return Location;
};