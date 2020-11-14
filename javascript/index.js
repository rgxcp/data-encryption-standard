const { encrypt, decrypt } = require('./des');

const plainText = 'computer';
const key = '12345678';

(async () => {
  const { encryptionInBinary, encryptionInHEX, encryptionInText } = await encrypt(plainText, key);
  console.log(`Encrypted Plain Text in Binary : ${encryptionInBinary.join(' | ')}`);
  console.log(`Encrypted Plain Text in HEX    : ${encryptionInHEX.join(' ')}`);
  console.log(`Encrypted Plain Text in Text   : ${encryptionInText.join('')}\n`);

  const decryptedCipherText = await decrypt(encryptionInBinary, key);
  console.log(`Decrypted Cipher Text : ${decryptedCipherText.join('')}`);
})();
