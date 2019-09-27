import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const {
      mailData: {
        organizerName,
        organizerEmail,
        meetupTitle,
        userName,
        userEmail,
      },
    } = data;

    Mail.sendMail({
      to: `${organizerName} <${organizerEmail}>`,
      subject: 'Nova inscrição em um dos seus meetups',
      template: 'subscription',
      context: {
        organizerName,
        userName,
        userEmail,
        meetupTitle,
      },
    });
  }
}

export default new SubscriptionMail();
