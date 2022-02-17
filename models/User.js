const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");

const PW_SALT_ROUNDS = 10;

class User extends Model {
  checkPassword(pw) {
    // Returns promise which resolves a boolean (true if pw matches)
    return bcrypt.compare(pw, this.password);
  }
}

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
      // Don't add beforeBulkCreate to hash passwords. It hashes before validate
      // when the validate option is used on bulkCreate.
    },
  }
);

module.exports = User;
