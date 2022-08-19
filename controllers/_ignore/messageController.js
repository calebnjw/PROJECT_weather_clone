const BaseController = require('../baseController.js');

class MessageController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(model, db) {
    super(model);
    this.User = db.User;
  }

  async getMessages(request, response) {
    const { locationId } = request.body;

    try {
      const messages = await this.model.findAll({ where: { locationId } });

      response.status(200).send(messages);
    } catch (error) {
      console.log(error);
      response.status(400).send({ error });
    }
  }

  async sendMessage(request, response) {
    const { message, locationId } = request.body;

    try {
      await this.model.create({ message, locationId });
      const messages = await this.model.findAll({ where: { locationId } });

      response.status(200).send(messages);
    } catch (error) {
      console.log(error);
      response.status(400).send({ error });
    }
  }
}

module.exports = MessageController;
