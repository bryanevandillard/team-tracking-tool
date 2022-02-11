const Member = require("./Member");
const Note = require("./Note");
const Team = require("./Team");
const User = require("./User");

// User's have many teams and a team MUST belong to one user.
User.hasMany(Team, {
  foreignKey: {
    // default fk is userId
    allowNull: false,
  },
  // Delete the teams if the user is deleted
  onDelete: "CASCADE",
});
Team.belongsTo(User);

// TODO:  Team:Note 1:* relationship

// TODO: Team:Member 1:* relationship

module.exports = { Member, Note, Team, User };
