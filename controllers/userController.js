const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BaseController = require('./baseController.js');

class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.UserLocation = db.UserLocation;
  }

  async userSignup(req, res) {
    const {
      firstName, lastName, username, email, password,
    } = req.body;

    try {
      // search for user on db using email address
      const checkEmail = await this.model.findOne({ where: { email } });

      // if there is an existing user, checkEmail will be truthy
      if (checkEmail) {
        return res.status(401).json({ message: 'Email in use, try another email or login!' });
      }

      // there is no user with same email, continue below
      // hash password
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
      // create new user on db
      const newUser = await this.model.create({
        firstName, lastName, username, email, password: hashedPassword,
      });

      // not sure if this is necessary, because we never use this to login automatically
      const payload = { id: newUser.id, username: newUser.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
      // pass token to front end
      // (I removed user, because we don't need to pass
      // sensitive data that we are not using to front end)
      return res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ err: err.message });
    }
  }

  async userLogin(req, res) {
    const { username, password } = req.body;

    try {
      // search for user on db
      const user = await this.model.findOne({ where: { username } });

      // if there is no user user will be falsy (NULL)
      if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
      }

      // there's a user, so continue below
      // compare passwords
      const compare = await bcrypt.compare(password, user.password);
      // if passwords do not match (compare = false):
      if (!compare) {
        return res.status(401).json({ message: 'Wrong password, try again!' });
      }

      // passwords match, continue below
      // create jwt payload with user id and username
      const payload = { id: user.id, username: user.username };
      // create token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
      // pass token to front end
      // (Same as above, removed user data)
      return res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ message: 'No user found. Sign up!' });
    }
  }

  async getFavourites(request, response) {
    const { userId } = request.body;

    try {
      const locations = await this.UserLocation.findAll({ where: { userId } });

      response.status(200).json({ success: true, locations });
    } catch (error) {
      console.log(error);
      response.status(400).json({ success: false, message: error.message });
    }
  }

  async newFavourite(request, response) {
    const {
      star, userId, city, lat, long,
    } = request.body;

    console.log('user:', request.user);

    console.log(star, userId, city, lat, long)

    try {
      if (star) {
        console.log(star, userId, city, lat, long)
        // await this.UserLocation.create({
        //   userId, city, lat, long,
        // });
      } else {
        console.log(star, userId, city, lat, long)
        // await this.UserLocation.destroy({
        //   where: {
        //     userId,
        //     city,
        //   },
        // });
      }

      response.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;
