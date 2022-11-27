const { Sequelize } = require('sequelize');

const initializeDB = () => {
    const sequelize = new Sequelize(
        process.env['SQL_DB_NAME'],
        process.env['SQL_DB_USERNAME'],
        process.env['SQL_DB_PASSWORD'],
        {
            host: process.env['SQL_DB_HOST'],
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            define: {
                paranoid: true
            }
        }
    );
    return sequelize;
}


exports.SQLize = initializeDB();