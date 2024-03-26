import { v4 as uuidv4 } from 'uuid';

export function generateNonce() {
  return uuidv4();
}

export function validateNonce(nonce, storedNonces) {
  return storedNonces.includes(nonce);
}