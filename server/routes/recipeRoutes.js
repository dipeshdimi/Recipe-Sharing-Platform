const express = require("express");
const router = express.Router();
const multer = require("multer");
const recipeController = require("../controllers/recipeController");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", upload.single("image"), recipeController.createRecipe);

module.exports = router;
