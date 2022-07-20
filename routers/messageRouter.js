const express = require('express');

const router = express.Router();

class MessageRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    // insert routes here
    // have to .bind(this.controller) at the end of each route
    router.get('/all', this.controller.getMessages.bind(this.controller));
    router.post('/new', this.controller.sendMessage.bind(this.controller));

    return router;
  }
}

module.exports = MessageRouter;
