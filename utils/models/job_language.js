const { DataTypes } = require('sequelize');
const { SQLize } = require('../db/connections/db.config')

const Language = SQLize.define('job_languages', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  language: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// skills: [{ type: String, required: true }],
// languages: [{ type: String, required: true }],
// benefits: [{ type: String, required: true }],
// candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

module.exports = Language;