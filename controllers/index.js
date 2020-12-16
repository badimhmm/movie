const {ProductionHouse, Movie, Cast, MovieCast} = require('../models')
const getAge = require('../helpers/getAge')

class Controller {
  static getRootHandler(req, res) {
    res.render('home')
  }
  static getProductionHousesHandler(req, res) {
    ProductionHouse.findAll()
    .then(data => {
      res.render('productionhouses-list', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getMoviesHandler(req, res) {
    Movie.findAll({
      include: [ProductionHouse],
      order: [['released_year','DESC']]
  })
    .then(data => {
      res.render('movies-list', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getMoviesAddHandler(req, res) {
        res.render('movie-add')
  }
  static postMoviesAddHandler(req, res) {
    const newMovie = {
      name: req.body.name,
      released_year: req.body.released_year,
      rating: req.body.rating,
      genre: req.body.genre,
      ProdHouseId: req.body.ProdHouseId
    }

    Movie
      .create(newMovie)
      .then(data => {
        res.redirect('/movies')
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static getMoviesEditHandler(req, res) {
    const id = +req.params.id
    let dataMovie = null
    Movie
      .findByPk(id)
      .then(data => {
        dataMovie = data
        return ProductionHouse
          .findAll()  
      })
      .then(dataPh => {
        res.render('movie-edit', { dataMovie, dataPh })
      })
      .catch(err => {
        res.send(err);
      })
  }
  static postMoviesEditHandler(req, res) {
    const id = req.params.id
    const updatedMovie = {
      name: req.body.name,
      released_year: req.body.released_year,
      rating: req.body.rating,
      genre: req.body.genre,
      ProdHouseId: req.body.ProdHouseId
    }

    Movie
      .update(updatedMovie, {
        where: {
          id: id
        }
      })
    .then(data => {
      res.redirect('/movies')
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getMoviesDeleteHandler(req, res) {
    const id = +req.params.id
    Movie
      .destroy({where: {id:id}})
      .then(data => {
        res.redirect('/movies')
      })
      .catch(err => {
        res.send(err)
      })
  }
  
  //-----------------------------------------------

  static getCastsHandler(req, res) {
    Cast
      .findAll({
        order: [['id', 'ASC']]
      })
      .then(data => {
        let msg = req.query.msg
        res.render('casts-list', {data, msg})
      })
      .catch(err => {
        res.send(err)
      })
  }


  static getCastAddHandler(req, res) {
    res.render('cast-add')
  }

  static postCastAddHandler(req, res) {
    const newCast = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      phone_number: req.body.phone_number,
      gender: req.body.gender
    }

    Cast
      .create(newCast)
      .then(data => {
        res.redirect(`/casts`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getCastEditHandler(req, res) {
    const id = req.params.id
    Cast
      .findByPk(id)
      .then(data => {
        res.render('cast-edit', { data })
      })
      .catch(err => {
        res.send(err);
      })
  }

  static postCastEditHandler(req, res) {
    const id = req.params.id
    const updatedCast = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      phone_number: req.body.phone_number,
      gender: req.body.gender
    }

    Cast
      .update(updatedCast, {
        where: {
          id: id
        },
        returning: true,
        invidualHooks: true
      })
    .then(data => {
      res.redirect(`/casts`)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static getCastDeleteHandler(req, res) {
    const id = req.params.id
    Cast
      .destroy({
        where: {
          id: id
        }
      })
      .then(data => {
        res.redirect(`/casts`)
      })
      .catch(err => {
        res.send(err)
      })
  }

// ---------------------------------------------

  static getMovieCastAddHandler(req, res) {
    let movie = null
    let data = null
    const id = req.params.id
    Movie
      .findByPk(id, { 
        include: [Cast] 
      })
      .then((data) => {
        movie = data
          return Cast.findAll()
      })
      .then((casts) => {
        data = casts
        res.render('moviecast-add', { movie, data })
      })
      .catch((err) => {
          res.send(err)
      });
  }

  static postMovieCastAddHandler(req, res) {
    let newMovieCast = {
      MovieId: req.params.id,
      CastId: req.body.CastId,
      role: req.body.role
    }

    MovieCast
      .create(newMovieCast)
      .then((data) => {
        res.redirect(`/movies/${req.params.id}/add-moviecasts`)
      })
      .catch((err) => {
        res.send(err.message)
      });
  }

  static getCastMoviesHandler(req, res) {
    const id = req.params.id
    Cast
      .findByPk(id, {
        include: [Movie]
      })
      .then((data) => {
        // res.send(data)
        res.render('moviecast-list', {data, getAge})
      })
      .catch((err) => {
        res.send(err)
      });
  }
}

module.exports = Controller;