const express = require("express")
const bookController = require("../controller/bookController")

const router = express.Router()

//---------------------API endpoints---------------------

router.post("/api/addbook", bookController.addBook)
router.get("/api/viewbook", bookController.viewBook)
router.get("/viewbookbyid/:id", bookController.viewBooksbyId)
router.post("/updatebook/:id", bookController.updateBooksbyId)
router.post("/deletebook/:id", bookController.deleteBook)

module.exports = router;