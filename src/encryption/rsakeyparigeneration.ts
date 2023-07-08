import * as crypto from 'crypto';
export let dbsecretkey = '';
import { RSA_ENCRYPTION_PASSPHRASE } from '../constant';
export function generatersa() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: RSA_ENCRYPTION_PASSPHRASE,
    },
  });

  const publickey = publicKey;
  const privatekey = privateKey;

  // Storing private key in dbsecretkey (assuming it's a global variable)
  dbsecretkey = privatekey;

  return { publickey, privatekey };
}
