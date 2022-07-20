const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');

=======
>>>>>>> 02d0be2d832dcba25b2b15729232153d7359c144
const BaseController = require('./baseController.js');

class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Location = db.Location;
  }

  async userSignup(req, res) {
    const { firstName, lastName, username, email, password } = req.body;
    try {
      const checkEmail = await this.model.findOne({ where: { email } })
      console.log('Email:', checkEmail)
<<<<<<< HEAD
      if (checkEmail) {
        return res.json({ success: false, message: 'Email in use, try again or login' })
=======
      if(checkEmail){
        return res.json({ message: "Email in use, try another email or login!" })
>>>>>>> 02d0be2d832dcba25b2b15729232153d7359c144
        // return res.status(400).json({success: false, message: 'Email in use, try again or login'})
      }
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
      const newUser = await this.model.create({ firstName, lastName, username, email, password: hashedPassword })
      const payload = { id: newUser.id, username: newUser.username }
      console.log('This is my payload', payload)
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
      console.log('This is backend token', token)
<<<<<<< HEAD
      return res.json({ newUser, token })
    } catch (err) {
      console.log(err)
    }
    console.log('This is our userSignup route')
=======
      return res.json({newUser, token})
    } catch(err){
      res.json({ err: err.message })
    }
>>>>>>> 02d0be2d832dcba25b2b15729232153d7359c144
  }

  async userLogin(req, res) {
    console.log("I am userLogin route")
    const { username, password } = req.body;
    try {
<<<<<<< HEAD
      const user = await this.model.findOne({ where: { username } })
      if (!user) {
        return res.json({ success: false, message: 'User does not exist' })
      }
      const compare = await bcrypt.compare(password, user.password)
      if (!compare) {
        return res.json({ success: false, message: 'Wrong password, try again!' })
      }
      const payload = { id: user.id, username: user.username }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
      return res.json({ user, token })
    } catch (err) {
      console.log(err)
=======
      const user = await this.model.findOne({where: { username }})
      console.log('This is the user', user)
      if(!user){
        return res.json({ message:'User does not exist'})
      }
      const compare = await bcrypt.compare(password, user.password)
      console.log('This is the password', password)
      if(!compare){
        return res.json({ message:'Wrong password, try again!'})
      }
      const payload = {id: user.id, username: user.username}
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
      return res.json({user, token})
    } catch(err){
      res.send({ message: "No user found. Sign up!" })
>>>>>>> 02d0be2d832dcba25b2b15729232153d7359c144
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

  async renderLogin(request, response) {
    console.log('I am render login')
  }

  async renderSignup(request, response) {
    console.log('I am render Signup')
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

  logout(request, response) {
    try {
      console.log('I have logged out')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = UserController;
