const express = require("express");
const router = express.Router();

//getalltasks name is same as previous exprots vala from tasks/controller;
// const { getAlltasks,createTask,getTask,uploadTask,deleteTask } = require('../tasks')

//we can write alag alag also but we can do it together also
//router.get('/',getpeople)
// router.route('/').get(getAlltasks).post(createTask)
// router.route('/:id').get(getTask).patch(uploadTask).delete(deleteTask)

const {
  getAllPitches,
  createPitches,
  getPitch,
  updatePitches,
  deletePitches,
  counterOffer,
  deleteAllPitch,
} = require("../controllers/pitches");

router.route("/").get(getAllPitches).post(createPitches).delete(deleteAllPitch);
router.route("/:id").get(getPitch).patch(updatePitches).delete(deletePitches);
router.route("/:id/makeOffer").post(counterOffer);
// router.route('/').get(getAllTasks)

//THE DIFFERENCE BETWEEN PUT AND PATCH IS THAT PATCH PARTIALLY UPDATES THE ITEMS AND PUT JSUT KEEPS THE ITEMS WHICH WE WILL PROVIDE IN BODY AND REMOVE ALL THE OTHER BUT PATCH WILL KEEP HTE PREVIOUS VALUE

module.exports = router;
