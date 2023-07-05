import { ValueTransformer } from 'typeorm';
import * as crypto from 'crypto';

const algorithm = 'aes-256-ecb';
const securityKey = 'e41c966f21f9e1577802463f8924e6a3';

export class MyEncryptionTransformer implements ValueTransformer {
  to(value: string): string {
    console.log(value);
    const cipher = crypto.createCipheriv(
      algorithm,
      securityKey,
      Buffer.alloc(0),
    ); // Use an empty Buffer as IV for ECB mode
    let encryptedData = cipher.update(value, 'utf-8', 'base64');
    encryptedData += cipher.final('base64');
    return encryptedData;
  }

  from(value: string): string {
    console.log(value);
    const decipher = crypto.createDecipheriv(
      algorithm,
      securityKey,
      Buffer.alloc(0),
    ); // Use an empty Buffer as IV for ECB mode
    let decryptedData = decipher.update(value, 'base64', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}
