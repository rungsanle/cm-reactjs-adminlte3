module.exports = (sequelize, Sequelize) => {
    const Warehouse = sequelize.define("warehouse", {
        WarehouseCode: {
            type: Sequelize.STRING
        },
        WarehouseName: {
            type: Sequelize.STRING
        },
        WarehouseDesc1: {
            type: Sequelize.STRING
        },
        WarehouseDesc2: {
            type: Sequelize.STRING
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

    return Warehouse;
};