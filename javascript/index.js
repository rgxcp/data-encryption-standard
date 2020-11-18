const { encrypt, decrypt } = require('./des');

const plainText = 'peaceful';
const key = '12345678';

(async () => {
  const { encryptionInBinary, encryptionInHEX, encryptionInString } = await encrypt(plainText, key);
  console.log(`Encrypted Plain Text in Binary : ${encryptionInBinary.join(' | ')}`);
  console.log(`Encrypted Plain Text in HEX    : ${encryptionInHEX.join(' ')}`);
  console.log(`Encrypted Plain Text in String : ${encryptionInString.join('')}\n`);

  // A wrong key that 90% identical with original key, sometimes can still get decrypted
  const decryptedCipherText = await decrypt(encryptionInBinary, key);
  console.log(`Decrypted Cipher Text : ${decryptedCipherText.join('')}`);
})();
