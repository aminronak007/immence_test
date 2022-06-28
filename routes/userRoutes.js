const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/user/list", UserController.userList);
router.post("/user/add", UserController.addUser);

module.exports = router;
