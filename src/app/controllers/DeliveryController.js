// import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryController {
  async store(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exists' });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    const delivery = await Delivery.create(req.body);
    return res.json({ delivery });
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.body.delivery);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery does not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman && req.body.deliveryman_id) {
      return res.status(401).json({ error: 'Deliveryman does not exists' });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient && req.body.recipient_id) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    const deliveryResponse = await delivery.update(req.body);

    return res.json({ deliveryResponse });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { pagelimit = 20 } = req.query;

    const deliveries = await Delivery.findAll({
      // where: { deliveryman_id: req.deliverymanId },
      // order: ['date'],
      limit: pagelimit,
      offset: (page - 1) * pagelimit,
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });
    return res.json({ deliveries });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery does not exists' });
    }

    await delivery.destroy();

    return res.json({ success: 'Delivery deleted successfully' });
  }
}
export default new DeliveryController();
