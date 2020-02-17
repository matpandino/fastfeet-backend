// import * as Yup from 'yup';
import Recepient from '../models/Recepient';

class RecepientController {
  // TODO VALIDATE RECEPIENT SCHEMA WITH YUP

  async index(req, res) {
    const recepientResponse = await Recepient.findAll();

    return res.json({
      recepientResponse,
    });
  }

  async store(req, res) {
    const { id, name } = await Recepient.create(req.body);

    return res.json({
      user: {
        id,
        name,
      },
    });
  }

  async update(req, res) {
    const recepient = await Recepient.findByPk(req.params.id);

    if (!recepient) {
      return res.status(401).json({ error: 'Recepient does not exists' });
    }

    const recepientResponse = await recepient.update(req.body);

    return res.json({
      recepientResponse,
    });
  }
}

export default new RecepientController();
