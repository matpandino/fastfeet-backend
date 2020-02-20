import Delivery from '../models/Delivery';
// import Deliveryman from '../models/Deliveryman';
// import Recipient from '../models/Recipient';
// import File from '../models/File';

class DeliverymanDeliveryController {
  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    const now = new Date();

    const data = { ...req.body, end_date: now };

    const deliveryResponse = await delivery.update(data);

    return res.json({ deliveryResponse });
  }
}

export default new DeliverymanDeliveryController();
