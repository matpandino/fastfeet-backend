import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

// import Deliveryman from '../models/Deliveryman';
// import Recipient from '../models/Recipient';
// import File from '../models/File';

class DeliverymanPickupController {
  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.deliveryId);

    const pickups = await Delivery.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
        deliveryman_id: req.params.deliveryManId,
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

export default new DeliverymanPickupController();
