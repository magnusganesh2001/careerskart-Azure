const { DataTypes } = require('sequelize');
const { SQLize } = require('../db/connections/db.config');
const Job = require('./job');
const User = require('./user');

const Candidate = SQLize.define('job_candidates', {}, { timestamps: false });

User.belongsToMany(Job, { through: Candidate })
Job.belongsToMany(User, { through: Candidate });

module.exports = Candidate;