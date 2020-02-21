import _ from 'lodash';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async store(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await DeliveryProblem.create({
      delivery_id: req.params.id,
      description: req.body.description,
    });

    return res.json();
  }

  async index(req, res) {
    let deliveryProblems;

    if (req.params.id) {
      deliveryProblems = await DeliveryProblem.findAll({
        where: {
          delivery_id: req.params.id,
        },
      });
    }

    deliveryProblems = await DeliveryProblem.findAll({
      include: [{ model: Delivery, as: 'delivery' }],
    });

    deliveryProblems = deliveryProblems.map(d => d.delivery);
    deliveryProblems = _.uniqBy(deliveryProblems, 'id');

    return res.json(deliveryProblems);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.update({
      canceled_at: new Date(),
      end_date: null,
    });

    return res.json();
  }
}

export default new DeliveryProblemController();
