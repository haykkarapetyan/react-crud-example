
const express = require('express')
const postsRoutes = require('./../controllers/posts-controller.js')
const router = express.Router()

router.get('/all', postsRoutes.postsAll)

router.post('/create', postsRoutes.postsCreate)

router.put('/delete', postsRoutes.postsDelete)

router.put('/edit', postsRoutes.postsEdit)

router.put('/update', postsRoutes.postsUpdate)

router.put('/show', postsRoutes.postsShow)

module.exports = router
