const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Member extends Model {}

Member.init(
  {
    // sequelize adds an id primary key field by default
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 30],
        isAlphanumeric: true,
      },
    },
    // teamId foreign key defined in associations (see index.js)
    // sequelize adds updatedAt and createdAt fields by default
  },
  {
    sequelize,
    modelName: "team",
  }
);

module.exports = Member;
