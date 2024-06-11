const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')

//helpers
const checkToken = require("../helpers/checkToken")
// const getUserByToken = require("../helpers/getUserByToken")

router.get('/create', checkToken, ProductController.createProduct)
router.post('/create', checkToken, ProductController.createProductPost)
router.post('/remove/:id', checkToken, ProductController.removeProduct)
router.post('/edit', checkToken, ProductController.editProductPost)
router.get('/edit/:id', checkToken, ProductController.editProduct)
router.get('/search', ProductController.searchProducts)
router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.showProducts)




module.exports = router