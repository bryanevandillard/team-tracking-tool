const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");

const PW_SALT_ROUNDS = 10;

class User extends Model {}

User.init(
  {
    // sequelize adds an id primary key field by default
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        // can contain only letters, numbers, and underscore. Must be 2-12 characters
        is: /^[a-z0-9_]{2,20}$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // TODO: add validation for includes upper, lower, digits, specials
        len: [8, 30],
      },
    },
    // sequelize adds updatedAt and createdAt fields by default
  },
  {
    sequelize,
    modelName: "user",
    hooks: {
      // hash password after validating it when a user is created or updated
      async afterValidate(user) {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, PW_SALT_ROUNDS);
        }
      },
      // hash password when creating users with bulk create (seed script)
      beforeBulkCreate(users) {
        return Promise.all(
          users.map(async (u) => {
            u.password = await bcrypt.hash(u.password, PW_SALT_ROUNDS);
          })
        );
      },
    },
  }
);

module.exports = User;
