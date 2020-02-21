import Delivery from '../models/Delivery';

class DeliveryDeliverController {
  async store(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!req.body.signature_id) {
      return res.status(400).json('Field signature_id not informed');
    }

    const deliveryResponse = await delivery.update({
      signature_id: req.body.signature_id,
    });
    return res.json(deliveryResponse);
  }
}

export default new DeliveryDeliverController();
