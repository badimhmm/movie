const Controller = require('../controllers')
router = require('express').Router()

router.get('/', Controller.getRootHandler)
router.get('/productionhouses', Controller.getProductionHousesHandler)
router.get('/movies', Controller.getMoviesHandler)
router.get('/movies/add', Controller.getMoviesAddHandler)
router.post('/movies/add', Controller.postMoviesAddHandler)
router.get('/movies/:id/edit', Controller.getMoviesEditHandler)
router.post('/movies/:id/edit', Controller.postMoviesEditHandler)
router.get('/movies/:id/delete', Controller.getMoviesDeleteHandler)

router.get('/casts', Controller.getCastsHandler)
router.get('/casts/add', Controller.getCastAddHandler)
router.post('/casts/add', Controller.postCastAddHandler)
router.get('/casts/:id/edit', Controller.getCastEditHandler)
router.post('/casts/:id/edit', Controller.postCastEditHandler)
router.get('/casts/:id/delete', Controller.getCastDeleteHandler)

router.get('/movies/:id/add-moviecasts', Controller.getMovieCastAddHandler)
router.post('/movies/:id/add-moviecasts', Controller.postMovieCastAddHandler)
router.get('/casts/:id/moviescast', Controller.getCastMoviesHandler)

module.exports = router;