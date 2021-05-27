
module.exports = (sequelize, Sequelize) => {
    const LocationType = sequelize.define("locationtype", {
        LocationTypeCode: {
            type: Sequelize.STRING
        },
        LocationTypeName: {
            type: Sequelize.STRING
        },
        LocationTypeDesc1: {
            type: Sequelize.STRING
        },
        LocationTypeDesc2: {
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
            defaultValue: sequelize.fn('NOW')
            //defaultValue: new Date().toLocaleString()
        },
        Updated_UserId: {
            type: Sequelize.BIGINT(11)
        },
        Updated_Date: {
            type: Sequelize.DATE 
        }
    });

    return LocationType;
};