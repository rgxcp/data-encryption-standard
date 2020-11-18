const { encrypt, decrypt } = require('./des');

const plainText = 'peaceful';
const key = '12345678';

(async () => {
  const { encryptionInBinary, encryptionInHEX, encryptionInString } = await encrypt(plainText, key);
  console.log(`Encrypted Plain Text in Binary : ${encryptionInBinary.join(' | ')}`);
  console.log(`Encrypted Plain Text in HEX    : ${encryptionInHEX.join(' ')}`);
  console.log(`Encrypted Plain Text in String : ${encryptionInString.join('')}\n`);

  // A wrong key that 7/8 identical with the original key, sometimes can still get decrypted
  // Example: 12345678 -> 12345679
  const decryptedCipherText = await decrypt(encryptionInBinary, key);
  console.log(`Decrypted Cipher Text : ${decryptedCipherText.join('')}`);
})();
