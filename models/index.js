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

// Teams's have many notes
// - default fk is teamId
// - default onDelete behavior is SET NULL
Team.hasMany(Note);
Note.belongsTo(Team);

// Team:Member 1:* relationship
// - default fk is teamId
// - default onDelete behavior is SET NULL
Team.hasMany(Member);
Member.belongsTo(Team);

module.exports = { Member, Note, Team, User };
