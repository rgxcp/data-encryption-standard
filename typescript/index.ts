import { DES } from './des';
import { Encrypt, Decrypt } from './interfaces';

const plainText: string = 'peaceful';
const key: string = '12345678';

async () => {
  const des: DES = new DES(key);

  const {
    encryptionInBinary,
    encryptionInHEX,
    encryptionInString
  }: Encrypt = await des.encrypt(plainText);
  console.log(
    `Encrypted Plain Text in Binary : ${encryptionInBinary.join(' | ')}`
  );
  console.log(`Encrypted Plain Text in HEX    : ${encryptionInHEX.join(' ')}`);
  console.log(
    `Encrypted Plain Text in String : ${encryptionInString.join('')}\n`
  );

  // A wrong key that 7/8 identical with the original key, sometimes can still get decrypted
  // Example: 12345678 -> 12345679
  const { decryptionInString }: Decrypt = await des.decrypt(encryptionInBinary);
  console.log(`Decrypted Cipher Text : ${decryptionInString.join('')}`);
};
