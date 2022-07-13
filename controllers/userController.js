const bcrypt = require('bcrypt');
require('dotenv').config();

const BaseController = require('./baseController.js');

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Location = db.Location;
  }

  async userSignup(request, response) {
    const { username, password } = request.body;

    try {
      // use bcrypt to hash passwords
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await this.model.create({
        username,
        password: hash,
      });

      if (user) {
        // tell frontend that signup was successful
        response.status(200).send({ signedUp: true });
      }
    } catch (error) {
      console.log(error);
      response.status(400).send({ error });
    }
  }

  async userLogin(request, response) {
    const { username, password } = request.body;

    try {
      const user = await this.model.findOne({ where: { username } });

      // use bcrypt to compare hashed passwords
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          response.cookie('loggedIn', true);
          response.cookie('userID', user.id);
          response.status(200).send({ loggedIn: true });
        } else {
          response.status(401).send({ loggedIn: false });
        }
      });
    } catch (error) {
      console.log(error);
      response.status(400).send({ error });
    }
  }

  async getFavourites(request, response) {
    const { userId } = request.body;

    try {
      const locations = await this.Location.findAll({ where: { userId } });

      response.status(200).send(locations);
    } catch (error) {
      console.log(error);
      response.status(400).send({ error });
    }
  }

  async newFavourite(request, response) {
    const { userId, locationId } = request.body;

    try {
      await this.Location.create({ userId, locationId });
      const locations = await this.Location.findAll({ where: { userId } });

      response.status(200).send(locations);
    } catch (error) {
      console.log(error);
      response.status(400).send({ error });
    }
  }

  userLogout(request, response) {
    // delete login cookies on logout
    if (request.loggedIn) {
      response.clearCookie('loggedIn');
      response.clearCookie('userID');
    }

    // redirect to login page
    response.redirect('/');
  }
}

module.exports = UserController;
