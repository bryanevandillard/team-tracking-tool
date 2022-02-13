const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Note extends Model {}

Note.init(
  {
    // sequelize adds an id primary key field by default
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    // teamId foreign key defined in associations (see index.js)
    // sequelize adds updatedAt and createdAt fields by default
  },
  {
    sequelize,
    modelName: "note",
  }
);

module.exports = Note;
