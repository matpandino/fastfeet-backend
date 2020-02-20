// import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  // TODO VALIDATE ReCiPIENT SCHEMA WITH YUP

  async index(req, res) {
    const recipientResponse = await Recipient.findAll();

    return res.json({
      recipientResponse,
    });
  }

  async store(req, res) {
    const { id, name } = await Recipient.create(req.body);

    return res.json({
      user: {
        id,
        name,
      },
    });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    const recipientResponse = await recipient.update(req.body);

    return res.json({
      recipientResponse,
    });
  }
}

export default new RecipientController();
