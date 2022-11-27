const { DataTypes } = require('sequelize');
const { SQLize } = require('../db/connections/db.config')

const UserTechnology = SQLize.define('user_technologies', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    technology: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = UserTechnology;