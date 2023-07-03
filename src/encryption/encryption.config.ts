import { ENCRYPTION_KEY } from 'src/constant';

export const MyEncryptionTransformerConfig = {
  key: ENCRYPTION_KEY,
  algorithm: 'aes-256-ctr',
  ivLength: 16,
};
