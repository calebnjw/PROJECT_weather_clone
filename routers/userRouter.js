const express = require('express');

const router = express.Router();

class UserRouter {
  constructor(controller, authMiddleware) {
    this.controller = controller;
    this.authMiddleware = authMiddleware;
  }

  router() {
    router.post('/login', this.controller.userLogin.bind(this.controller));
    router.post('/signup', this.controller.userSignup.bind(this.controller));

    // middleware
    // make sure requests carry the authentication header
    router.use(this.authMiddleware);

    router.get('/get-favourites', this.controller.getFavourites.bind(this.controller));
    router.post('/new-favourite', this.controller.newFavourite.bind(this.controller));
    return router;
  }
}

module.exports = UserRouter;
