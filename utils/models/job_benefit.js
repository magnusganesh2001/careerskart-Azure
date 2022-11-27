const { DataTypes } = require('sequelize');
const { SQLize } = require('../db/connections/db.config')

const Benefit = SQLize.define('job_benefits', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  benefit: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// skills: [{ type: String, required: true }],
// languages: [{ type: String, required: true }],
// benefits: [{ type: String, required: true }],
// candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

module.exports = Benefit;