const { DataTypes } = require('sequelize');
const { SQLize } = require('../db/connections/db.config');

const UserSkill = SQLize.define('user_skills', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    skill: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = UserSkill;