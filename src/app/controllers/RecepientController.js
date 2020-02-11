// import * as Yup from 'yup';
import Recepient from '../models/Recepient';

class RecepientController {
  // TODO VALIDATE RECEPIENT SCHEMA WITH YUP

  async store(req, res) {
    const recepientExists = await Recepient.findOne({
      where: { name: req.body.name },
    });

    if (recepientExists) {
      return res.status(401).json({ error: 'Recepient already exists' });
    }

    const { id, name } = await Recepient.create(req.body);

    return res.json({
      user: {
        id,
        name,
      },
    });
  }

  async update(req, res) {
    const recepient = await Recepient.findOne({
      where: { name: req.body.name },
    });

    if (!recepient) {
      return res.status(401).json({ error: 'Recepient does not exists' });
    }

    const recepientResponse = await recepient.update(req.body);

    return res.json({
      user: {
        recepientResponse,
      },
    });
  }
}

export default new RecepientController();
