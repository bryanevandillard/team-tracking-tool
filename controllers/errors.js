module.exports = {
  invalidTeamError: (res) =>
    res.status(400).json({
      message: "Team doesn't exist or user is not the team owner.",
    }),
  serverError: (res) => res.status(500).json({ message: "Server error" }),
};
