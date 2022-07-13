const express = require('express');

const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    // insert routes here
    // have to .bind(this.controller) at the end of each route
    router.get('/favourites', this.controller.getFavourites.bind(this.controller));

    router.get('/logout', this.controller.userLogout.bind(this.controller));

    router.post('/login', this.controller.userLogin.bind(this.controller));
    router.post('/signup', this.controller.userSignup.bind(this.controller));

    return router;
  }
}

module.exports = UserRouter;
