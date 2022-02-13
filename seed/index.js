/* 
  Run this script to populate the database with example users, teams, and notes.
*/
const sequelize = require("../config/sequelize");
const seedData = require("./seedData.json");
const { User } = require("../models");

(async () => {
  try {
    await sequelize.sync({ force: true });

    // Create users
    await Promise.all(
      seedData.map(async (userData) => {
        const user = await User.create(userData);
        // Create teams belonging to the user
        await Promise.all(
          userData.teams.map(async (teamData) => {
            const team = await user.createTeam(teamData);

            // Create notes associated with the team
            await Promise.all(
              teamData.notes.map((noteData) => team.createNote(noteData))
            );

            // Create members associated with the team
            await Promise.all(
              teamData.members.map((memberData) =>
                team.createMember(memberData)
              )
            );
          })
        );
      })
    );
    console.log("Successfully seeded data. Exiting...");
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.error("There was an error trying to seed the database. Exiting...");
    process.exit(1);
  }
})();
