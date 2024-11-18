const userService = require("../services/userService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createUser = async (req, res) => {
    try {
        const user = await userService.CreateUser(req.body);
        res.status(201).json(createEnvelope(true, "User created successfully", user));
    } catch (error) {
        res.status(500).json(createEnvelope(false, "Error creating user", error.message));
    }
};

// List all
const getUsers = async (_req, res) => {
    try {
        const users = await userService.GetUsers();
        res.status(200).json(createEnvelope(true, "Users fetched successfully", users));
    } catch (error) {
        res.status(500).json(createEnvelope(false, "Error fetching users", error.message));
    }
};

// Find by email
const getUserByEmail = async (req, res) => {
    try {
        const user = await userService.GetUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).json(createEnvelope(false, "User not found"));
        }
        res.status(200).json(createEnvelope(true, "User fetched successfully", user));
    } catch (error) {
        res.status(500).json(createEnvelope(false, "Error fetching user", error.message));
    }
};

// Update
const updateUser = async (req, res) => {
    try {
        const user = await userService.UpdateUser(req.params.email, req.body);
        if (!user) {
            return res.status(404).json(createEnvelope(false, "User not found"));
        }
        res.status(200).json(createEnvelope(true, "User updated successfully", user));
    } catch (error) {
        res.status(500).json(createEnvelope(false, "Error updating user", error.message));
    }
};

// Delete
const deleteUser = async (req, res) => {
    try {
        const user = await userService.DeleteUser(req.params.email);
        if (!user) {
            return res.status(404).json(createEnvelope(false, "User not found"));
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json(createEnvelope(false, "Error deleting user", error.message));
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
};
