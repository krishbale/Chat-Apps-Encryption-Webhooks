import * as NODERSA from 'node-rsa';
// export const dbsecretkey = '';
export function rsakeys() {
  const keys = NODERSA({ b: 1024 });
  const publickey = keys.exportKey('public');
  const privatekey = keys.exportKey('private');
  return { publickey, privatekey };
}

export function resDecrypt(key, text) {
  const Keyprivate = new NODERSA(key, text);
  const decrypted = Keyprivate.decrypt(text, 'utf8');
  return decrypted;
}
