//END TO END ENCRYPTION
import * as crypto from 'crypto';
import { dbsecretkey } from './rsakeyparigeneration';
import { RSA_ENCRYPTION_PASSPHRASE } from '../constant';
// Function to encrypt a message using the public key
const encryptMessage = (message, publicKey) => {
  const encryptedBuffer = crypto.publicEncrypt(
    publicKey,
    Buffer.from(message, 'utf8'),
  );
  const encryptedMessage = encryptedBuffer.toString('base64');
  return encryptedMessage;
};

// Function to decrypt a message using the private key
export const decryptMessage = (encryptedMessage) => {
  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: dbsecretkey,
      passphrase: RSA_ENCRYPTION_PASSPHRASE,
    },
    Buffer.from(encryptedMessage, 'base64'),
  );
  const decryptedMessage = decryptedBuffer.toString('utf8');
  return decryptedMessage;
};

module.exports = {
  encryptMessage,
  decryptMessage,
};
