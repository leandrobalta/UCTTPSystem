const User = require("../models/User");

// Create
const CreateUser = async (data) => {
    const user = await User.create(data);
    return user;
};

// List all
const GetUsers = async () => {
    const users = await User.findAll();
    return users;
};

// Find by email
const GetUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

// Update
const UpdateUser = async (email, data) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    await user.update(data);
    return user;
};

// Delete
const DeleteUser = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    await user.destroy();
    return user;
};

module.exports = {
    CreateUser,
    GetUsers,
    GetUserByEmail,
    UpdateUser,
    DeleteUser,
};
