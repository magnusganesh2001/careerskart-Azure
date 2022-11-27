const { DataTypes } = require('sequelize');
const { SQLize } = require("../db/connections/db.config");
const Benefit = require('./job_benefit');
const Language = require('./job_language');
const Skill = require('./job_skill');
const User = require('./user');

const Job = SQLize.define('jobs', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    companyUrl: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    jobType: { type: DataTypes.STRING, allowNull: false },
    urgent: { type: DataTypes.BOOLEAN, allowNull: false },
    employer: { type: DataTypes.INTEGER , allowNull: false },
}, { timestamps: false });

Job.hasMany(Skill);
Skill.belongsTo(Job);
Job.hasMany(Language);
Language.belongsTo(Job);
Job.hasMany(Benefit);
Benefit.belongsTo(Job);

module.exports = Job;
