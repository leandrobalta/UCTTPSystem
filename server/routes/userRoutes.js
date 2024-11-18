const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/user", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/user/:email", userController.getUserByEmail);
router.put("/user/:email", userController.updateUser);
router.delete("/user/:email", userController.deleteUser);

module.exports = router;
