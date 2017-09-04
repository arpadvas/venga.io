import * as nodemailer from "nodemailer";
import { config } from "../config/index";

/**
 * configure transporter
 */
export const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: true,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});