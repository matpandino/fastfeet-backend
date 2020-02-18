// import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const deliveryman = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliveryman) {
      return res.status(401).json({ error: 'Deliveryman already exists' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({
      deliverymanResponse: {
        name,
        email,
      },
    });
  }

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exists' });
    }

    if (deliveryman.email === req.body.email) {
      return res.status(401).json({ error: 'This e-mail is already taken' });
    }

    const deliverymanResponse = await deliveryman.update(req.body);

    return res.json({
      deliverymanResponse,
    });
  }

  async index(req, res) {
    const deliverymenResponse = await Deliveryman.findAll();

    return res.json({ deliverymenResponse });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exists' });
    }

    await deliveryman.destroy();

    return res.json({ success: 'Deliveryman deleted successfully' });
  }
}

export default new DeliverymanController();
