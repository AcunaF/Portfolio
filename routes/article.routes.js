const express = require("express");
const ArticleController = require("../controllers/Article.controller");
const multer = require("multer");
const router = express.Router();

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image/article/");
  },

  filename: function (req, file, cb) {
    cb(null, "article" + Date.now() + file.originalname);
  },
});

const uploads = multer({
  storage: storageImage,
});

router.get("/version", ArticleController.test);
router.get("/", ArticleController.datos);

router.post("/saveArticle", ArticleController.saveArticles);
router.get("/getArticles", ArticleController.getArticles);
router.get("/getArticleById/:id", ArticleController.getArticlesById);
router.delete("/delete/:id", ArticleController.deleteArticle);
router.put("/update/:id", ArticleController.updateArticle);
router.post(
  "/upload/:id",
  [uploads.single("file")],
  ArticleController.uploadFile
);
router.get("/buscador/:busqueda", ArticleController.seeker);

module.exports = router;
