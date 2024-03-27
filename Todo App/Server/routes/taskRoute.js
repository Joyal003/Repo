const {
    createTask,
    listTask,
    listTaskId,
    updateTask,
    deleteTask,
  } = require("../controllers/todo");


const router = require("express").Router();


router.post("/addtask", createTask);
router.get("/viewtask",listTask);
router.get("/taskView/:id",listTaskId)
router.put("/taskUpdate/:id",updateTask)
router.delete("/taskRemove/:id",deleteTask);

module.exports = router;