const express = require('express');
const router = express.Router();

const ArticleController = require("../controllers/Article.controller")
//rutas de prueba

router.get('/ruta-de-prueba',ArticleController.test);
router.get('/datos',ArticleController.datos);

router.post('/saveArticle',ArticleController.saveArticles);
router.get('/getArticles',ArticleController.getArticles);
router.get('/getArticleById/:id',ArticleController.getArticlesById);
router.delete('/delete/:id',ArticleController.deleteArticle);
router.put('/update/:id',ArticleController.updateArticle);


module.exports = router;


