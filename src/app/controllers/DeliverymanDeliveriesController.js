import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliverymanDeliveriesController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
      },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'createdAt',
        'updatedAt',
      ],
      include: [{ model: Recipient, as: 'recipient' }],
    });

    return res.json(deliveries);
  }
}

export default new DeliverymanDeliveriesController();
