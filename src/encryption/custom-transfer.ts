import { ValueTransformer } from 'typeorm';
import * as crypto from 'crypto';
import { EncryptionOptions } from './encryptions.option';

const algorithm = 'aes-256-ecb';
export class MyEncryptionTransformer implements ValueTransformer {
  constructor(private options: EncryptionOptions) {}

  to(value: string): string {
    const { key } = this.options;
    console.log(algorithm, key);
    const cipher = crypto.createCipheriv(
      algorithm, // algorithm
      key, // key
      Buffer.alloc(0),
    ); // Use an empty Buffer as IV for ECB mode
    let encryptedData = cipher.update(value, 'utf-8', 'base64');
    encryptedData += cipher.final('base64');
    return encryptedData;
  }

  from(value: string): string {
    const { key } = this.options;

    const decipher = crypto.createDecipheriv(
      algorithm, // algorithm
      key, // key
      Buffer.alloc(0),
    ); // Use an empty Buffer as IV
    let decryptedData = decipher.update(value, 'base64', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}
