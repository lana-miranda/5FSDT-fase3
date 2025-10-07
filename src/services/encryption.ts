import crypto from 'crypto';

const ENC_ALGO = 'aes-256-gcm';
const ENCRYPTION_TOKEN = process.env.ENCRYPTION_TOKEN || 'enc_fallback_key';
const ENC_VECTOR_LENGTH = 16; 
const ENC_SALT_LENGTH = 64; 
const ENC_KEY_LENGTH = 32; 
const ENC_ITERATIONS = 356;

export function encrypt(data: Record<string, unknown>, _iv?: Buffer, _salt?: Buffer): string {
  const iv = _iv || crypto.randomBytes(ENC_VECTOR_LENGTH);
  const salt = _salt || crypto.randomBytes(ENC_SALT_LENGTH);
  const key = crypto.pbkdf2Sync(ENCRYPTION_TOKEN, salt, ENC_ITERATIONS, ENC_KEY_LENGTH, 'sha512');
  const cipher = crypto.createCipheriv(ENC_ALGO, key, iv);
  const text = JSON.stringify(data);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

export function decrypt<T = Record<string, unknown>>(token: string): T {
  const bData = Buffer.from(token, 'base64');
  const salt = bData.subarray(0, 64);
  const iv = bData.subarray(64, 80);
  const tag = bData.subarray(80, 96);
  const text = bData.subarray(96);
  const key = crypto.pbkdf2Sync(ENCRYPTION_TOKEN, salt, ENC_ITERATIONS, ENC_KEY_LENGTH, 'sha512');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = decipher.update(text, undefined, 'utf8') + decipher.final('utf8');

  return JSON.parse(decrypted);
}