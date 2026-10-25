import { MAILING_LIST_ADDRESS } from '../../config/links';

// URLSearchParams codifica el "+" de la dirección como %2B, que es lo que necesitan Gmail y Outlook.
const SUBJECT = 'subscribe';

export const gmailUrl = () =>
  `https://mail.google.com/mail/?${new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: MAILING_LIST_ADDRESS,
    su: SUBJECT
  })}`;

export const outlookUrl = () =>
  `https://outlook.office.com/mail/deeplink/compose?${new URLSearchParams({
    to: MAILING_LIST_ADDRESS,
    subject: SUBJECT
  })}`;

export const mailtoUrl = () => `mailto:${MAILING_LIST_ADDRESS}?subject=${SUBJECT}`;
