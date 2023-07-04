import { ValueTransformer } from 'typeorm';
import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const Securitykey = 'e41c966f21f9e1577802463f8924e6a3';

export class MyEncryptionTransformer implements ValueTransformer {
  to(value: string): string {
    const initVector = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(value, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return initVector.toString('hex') + encryptedData;
  }

  from(value: string): string {
    const initVector = Buffer.from(value.substring(0, 32), 'hex'); // Extract the initialization vector
    const cipherText = value.substring(32);
    const decipher = crypto.createDecipheriv(
      algorithm,
      Securitykey,
      initVector,
    );
    let decryptedData = decipher.update(cipherText, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}
