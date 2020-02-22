import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: `Entrega #${delivery.id} cancelada`,
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        delivery_id: delivery.id,
        recipient: delivery.recipient.name,
        recipient_zip_code: delivery.recipient.zip_code,
        product: delivery.product,
      },
    });
  }
}

export default new CancellationMail();
