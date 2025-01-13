const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");

// beginning with /api/tasks
router.get("/", getTasks);
router.get("/:taskId", getTask);
router.post("/", postTask);
router.put("/:taskId", putTask);
router.delete("/:taskId", deleteTask);

module.exports = router;