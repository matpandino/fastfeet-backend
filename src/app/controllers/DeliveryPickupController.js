import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveryPickupController {
  async store(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery does not exists' });
    }

    const pickups = await Delivery.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
        deliveryman_id: delivery.deliveryman_id,
      },
      attributes: ['id'],
    });

    if (pickups.length >= 5) {
      return res.status(400).json({ error: 'Today limit of pickups reached.' });
    }

    const now = new Date();

    if (!(now.getHours() >= 8 && now.getHours() <= 19)) {
      return res.status(400).json({
        error: 'Not available to do pickups at this time of the day.',
      });
    }

    const deliveryResponse = await delivery.update({ start_date: now });
    return res.json(deliveryResponse);
  }
}

export default new DeliveryPickupController();
