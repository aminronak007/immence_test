const router = require("express").Router();
const WorklogController = require("../controllers/worklogController");

router.post("/worklog/add", WorklogController.addWorklogs);
router.get("/worklogs/list", WorklogController.worklogsList);
router.put("/worklog/edit/:id", WorklogController.editWorklogs);
router.delete("/worklog/delete/:id", WorklogController.deleteWorklog);

module.exports = router;
