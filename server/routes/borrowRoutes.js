const router = require("express").Router();

const {borrow, getBorrowRecords, returnBorrow,} = require("../controllers/borrowController");

router.get("/", getBorrowRecords);
router.post("/", borrow);
router.post("/return", returnBorrow);

module.exports = router;