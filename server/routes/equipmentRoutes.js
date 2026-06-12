const router = require("express").Router();

const {getAll, create, remove, update} = require("../controllers/equipmentController");

router.get("/", getAll);

router.post("/", create);

router.delete("/:id", remove);

router.put("/:id", update);

module.exports = router;