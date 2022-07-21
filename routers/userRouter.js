const express = require('express');

const router = express.Router();

class UserRouter {
  constructor(controller, authMiddleware) {
    this.controller = controller;
    this.authMiddleware = authMiddleware;
  }

  router() {
    // insert routes here
    // have to .bind(this.controller) at the end of each route
    router.post('/login', this.controller.userLogin.bind(this.controller));
    router.post('/signup', this.controller.userSignup.bind(this.controller));
    // middleware
    // somehow the routes don't work if there's this middleware there...
    router.use(this.authMiddleware);
    // rest of routes after middleware
    router.post('/get-favourites', this.controller.getFavourites.bind(this.controller));
    router.post('/new-favourite', this.controller.newFavourite.bind(this.controller));
    return router;
  }
}

module.exports = UserRouter;
