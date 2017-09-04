import { config } from "../config/index";

export function generateActivateToken(): any {
    const generatedToken = Math.floor(config.activateTokenMin + Math.random() * config.activateTokenMax);
    return generatedToken;
}