import * as bcrypt from "bcrypt";

/**
 * Make user authenticated
 */
export function authenticateUser(password: string, hash: string): Promise<boolean> {
    return new Promise<boolean>(async function(resolve: (value?: boolean | PromiseLike<boolean>) => void, reject: (reason?: any) => void): Promise<void> {
        try {
            const isAuthenticated = await bcrypt.compare(password, hash);
            return resolve (isAuthenticated);
        } catch (err) {
                if (err) {
                    return reject(err);
                }
        }
    });
}