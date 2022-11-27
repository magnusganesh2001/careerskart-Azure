const { DataTypes } = require('sequelize');
const { SQLize } = require('../../utils/db/connections/db.config')

const Skill = SQLize.define('job_skills', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  skill: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// skills: [{ type: String, required: true }],
// languages: [{ type: String, required: true }],
// benefits: [{ type: String, required: true }],
// candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

module.exports = Skill;