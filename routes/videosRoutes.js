const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const videosController = require("../controllers/videosController");

router.get("/videos", requireAuth, (req, res) => videosController.page(req, res));
router.post("/favorites", requireAuth, (req, res) => videosController.add(req, res));
router.post("/favorites/:id/delete", requireAuth, (req, res) => videosController.remove(req, res));

module.exports = router;
