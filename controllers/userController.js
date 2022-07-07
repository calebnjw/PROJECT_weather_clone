const bcrypt = require('bcrypt');

const BaseController = require('./baseController');

const saltRounds = 10;

class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Avatar = db.Avatar;
    this.AvatarLikes = db.AvatarLikes;
  }

  async userSignup(request, response) {
    const { username, password } = request.body;

    try {
      // use bcrypt to hash passwords
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        const user = await this.model.create({
          username,
          password: hash,
        });

        if (user) {
          // tell frontend that signup was successful
          response.status(200).send({ signedUp: true });
        }
      });
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

  async getUser(request, response) {
    const { username } = request.params;
    const user = await this.model.findOne({ where: { username } });

    if (user) {
      response.status(200).send({ userId: user.id });
    } else {
      response.status(400).send({ message: 'No user found.' });
    }
  }

  static userLogout(request, response) {
    // delete login cookies on logout
    if (request.loggedIn) {
      response.clearCookie('loggedIn');
      response.clearCookie('userID');
    }

    // redirect to login page
    response.redirect('/user/login');
  }
}

module.exports = UserController;
