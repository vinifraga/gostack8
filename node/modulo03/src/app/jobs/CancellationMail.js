import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('a fila executou');

    const formatedDate = format(
      parseISO(appointment.date),
      "'dia' dd 'de' MMMM', às ' H:mm'h'",
      { locale: pt }
    );

    Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: formatedDate,
      },
    });
  }
}

export default new CancellationMail();
