const router = require("express").Router();
const { borrow } = require("../controllers/borrowController");

router.post("/", borrow);

module.exports = router;