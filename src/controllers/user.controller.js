const userModel = require("../models/user.model");

function getUserProfile(req, res) {
  const userId = req.user.userId;
  userModel.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user profile" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });
}

async function updateUserProfile(req, res) {
  try {
    const userId = req.user.userId;

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password");   
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated User:", updatedUser);

    res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Error updating user profile" });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
};