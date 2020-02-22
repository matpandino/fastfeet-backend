import Mail from '../../lib/Mail';

class PickupReady {
  get key() {
    return 'PickupReady';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Nova entrega disponível para retirada`,
      template: 'pickup-ready',
      context: {
        deliveryman: deliveryman.name,
        delivery_id: delivery.id,
        recipient: recipient.name,
        recipient_zip_code: recipient.zip_code,
        product: delivery.product,
      },
    });
  }
}

export default new PickupReady();
