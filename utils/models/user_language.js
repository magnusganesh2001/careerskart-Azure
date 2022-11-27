const { DataTypes } = require('sequelize');
const { SQLize } = require('../db/connections/db.config');

const UserLanguage = SQLize.define('user_languages', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    language: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = UserLanguage;