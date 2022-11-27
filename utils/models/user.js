const { DataTypes } = require('sequelize');
const { SQLize } = require('../../utils/db/connections/db.config');
const Job = require('./job');
const UserLanguage = require('./user_language');
const UserSkill = require('./user_skill');
const UserTechnology = require('./user_technology');

const User = SQLize.define('users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING },
    companyUrl: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING, allowNull: false },
    resume: { type: DataTypes.STRING }
});

User.hasMany(UserSkill);
User.hasMany(UserLanguage);
User.hasMany(UserTechnology);
UserSkill.belongsTo(User);
UserLanguage.belongsTo(User);
UserTechnology.belongsTo(User);

module.exports = User;