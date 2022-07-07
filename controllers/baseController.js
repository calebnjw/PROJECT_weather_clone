// const { Router } = require("express");

class BaseController {
  constructor(model) {
    this.model = model;
  }
}

module.exports = BaseController;
