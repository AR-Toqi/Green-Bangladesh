import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { envConfig } from '../../config';

interface ISendEmailOptions {
    to: string;
    subject: string;
    templateName: string;
    templateData: any;
}

/**
 * sendEmail helper function to send emails using nodemailer and ejs templates
 */
export const sendEmail = async (options: ISendEmailOptions) => {
    const { to, subject, templateName, templateData } = options;

    const transporter = nodemailer.createTransport({
        host: envConfig.EMAIL_SENDER.SMTP_HOST,
        port: Number(envConfig.EMAIL_SENDER.SMTP_PORT),
        secure: Number(envConfig.EMAIL_SENDER.SMTP_PORT) === 465,
        auth: {
            user: envConfig.EMAIL_SENDER.SMTP_USER,
            pass: envConfig.EMAIL_SENDER.SMTP_PASS,
        },
    });

    const templatePath = path.join(process.cwd(), 'src', 'app', 'views', 'emails', `${templateName}.ejs`);
    
    const html = (await ejs.renderFile(templatePath, templateData)) as string;

    await transporter.sendMail({
        from: envConfig.EMAIL_SENDER.SMTP_FROM,
        to,
        subject,
        html,
    });
};
