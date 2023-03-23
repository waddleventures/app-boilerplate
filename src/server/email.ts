/* eslint-disable @typescript-eslint/no-explicit-any */
import sg from '@sendgrid/mail';
import { env } from '../env/server.mjs';

// CONSTANTS
import { CEMailFromAddress } from '../constants/emails.constants';


sg.setApiKey(env.SENDGRID_API_KEY);

type Props = {
  to: string;
  from?: string;
  templateId: string;
  vars: Record<string, string>;
};

const sendEmail = async ({
  to,
  from = CEMailFromAddress,
  templateId,
  vars,
}: Props) => {
  try {
    await sg.send({
      to,
      from,
      templateId,
      dynamicTemplateData: vars,
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(error as any);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error((error as any).response?.body?.errors)
    throw error;
  }
}

export default sendEmail;