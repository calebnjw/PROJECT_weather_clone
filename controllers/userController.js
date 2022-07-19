const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const { startFailed } = require('init');
const BaseController = require('./baseController.js');
const jwt =require("jsonwebtoken");

class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Location = db.Location;
  }

  async userSignup(req, res) {
    const { firstName, lastName, username, email, password } = req.body;
    try {
      const checkEmail = await this.model.findOne({where: { email }})
      console.log('Email:', checkEmail)
      if(checkEmail){
        return res.json({success: false, message: 'Email in use, try again or login'})
      }
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
      const newUser = await this.model.create({firstName, lastName, username, email, password: hashedPassword})
      const payload = { id: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName, username: newUser.username, email: newUser.email, password: hashedPassword}
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
      return res.json({newUser, token})
    } catch(err){
      console.log(err)
    }
    console.log("This is our userSignup route")
  }

  async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.model.findOne({where: { email }})
      if(!user){
        return res.json({success: startFailed, message:'User does not exist'})
      }
      const compare = await bcrypt.compare(password, user.password)
      if(!compare){
        return res.json({success: startFailed, message:'Wrong password, try again!'})
      }
      const payload = {id: user.id, email: user.email}
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
      return res.json({user, token})
    } catch(err){
      console.log(err)
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

  async renderLogin(request, response){
    console.log("I am render login")
  }

  async renderSignup(request, response){
    console.log("I am render Signup")
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
      console.log("I have logged out")
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = UserController;
