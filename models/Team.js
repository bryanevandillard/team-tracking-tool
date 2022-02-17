const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Team extends Model {}

Team.init(
  {
    // sequelize adds an id primary key field by default
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
    // userId foreign key defined in associations (see index.js)
    // sequelize adds updatedAt and createdAt fields by default
  },
  {
    sequelize,
    modelName: "team",
  }
);

module.exports = Team;
