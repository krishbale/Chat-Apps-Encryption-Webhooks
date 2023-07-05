import { ValueTransformer } from 'typeorm';
import * as crypto from 'crypto';
import { EncryptionOptions } from './encryptions.option';

const algorithm = 'aes-256-ctr';
export class MyEncryptionTransformer implements ValueTransformer {
  constructor(private options: EncryptionOptions) {}

  to(value: string): string {
    const { key } = this.options;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      algorithm, // algorithm
      key, // key
      iv,
    ); // Use an empty Buffer
    let encryptedData = cipher.update(value, 'utf-8', 'base64');
    encryptedData += cipher.final('base64');
    const encryptedValueWithIV = iv.toString('base64') + encryptedData; // Prepend IV to the encrypted value
    return encryptedValueWithIV;
  }

  from(value: string): string {
    const { key } = this.options;
    const iv = Buffer.from(value.substring(0, 24), 'base64');
    const encryptedData = value.substring(24);
    const decipher = crypto.createDecipheriv(
      algorithm, // algorithm
      key, // key
      iv,
    ); // Use an empty Buffer as IV
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}
