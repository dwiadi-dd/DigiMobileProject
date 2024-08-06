import Aes from 'react-native-aes-crypto';

const ENCRYPTION_KEY = 'YourSecretKey123'; // Replace with a secure, randomly generated key

const encryptionService = {
  encrypt: async (text: string): Promise<string> => {
    try {
      const salt = await Aes.randomKey(16);
      const key = await Aes.pbkdf2(ENCRYPTION_KEY, salt, 5000, 256, 'sha256');
      const iv = await Aes.randomKey(16);
      const result = await Aes.encrypt(text, key, iv, 'aes-256-cbc');
      return `${salt}:${iv}:${result}`;
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  },

  decrypt: async (ciphertext: string): Promise<string> => {
    try {
      const [salt, iv, encrypted] = ciphertext.split(':');
      const key = await Aes.pbkdf2(ENCRYPTION_KEY, salt, 5000, 256, 'sha256');
      const decrypted = await Aes.decrypt(encrypted, key, iv, 'aes-256-cbc');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  },
};

export default encryptionService;
