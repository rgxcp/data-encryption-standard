import { binaryToHEX } from './binary-to-hex';
import { binaryToString } from './binary-to-string';
import { generate16CD } from './generate-16-cd';
import { generate16K } from './generate-16-k';
import { generateR16L16 } from './generate-r16-l16';
import { Encrypt, Decrypt } from './interfaces';
import {
  finalPermutationMatrix,
  initialPermutationMatrix,
  permutedChoice1Matrix
} from './matrix';
import { permutation } from './permutation';
import { stringToBinary } from './string-to-binary';

export class DES {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  encrypt(plainText: string): Encrypt {
    console.log(`Plain Text : ${plainText}`);
    console.log(`Key : ${this.key}\n`);

    const binaryPlainText: string[] = stringToBinary(plainText);
    console.log(`Binary Plain Text : ${binaryPlainText.join(' | ')}`);

    const binaryKey: string[] = stringToBinary(this.key);
    console.log(`Binary Key : ${binaryKey.join(' | ')}\n`);

    const plainTextIP: string[] = permutation(
      binaryPlainText,
      initialPermutationMatrix,
      8
    );
    const leftPlainTextIP: string[] = plainTextIP.slice(0, 4);
    const rightPlainTextIP: string[] = plainTextIP.slice(4, 8);
    console.log(
      `Plain Text Initial Permutation (IP) : ${plainTextIP.join(' | ')}`
    );
    console.log(`Left (L0) : ${leftPlainTextIP.join(' | ')}`);
    console.log(`Right (R0) : ${rightPlainTextIP.join(' | ')}\n`);

    const keyPC1: string[] = permutation(binaryKey, permutedChoice1Matrix, 8);
    const leftKeyPC1: string[] = keyPC1.slice(0, 4);
    const rightKeyPC1: string[] = keyPC1.slice(4, 8);
    console.log(`Key Permuted Choice 1 (PC-1) : ${keyPC1.join(' | ')}`);
    console.log(`Left (C0) : ${leftKeyPC1.join(' | ')}`);
    console.log(`Right (D0) : ${rightKeyPC1.join(' | ')}\n`);

    console.log('Generated 16 CD:');
    const sixteenCD: string[][] = generate16CD(leftKeyPC1, rightKeyPC1);

    console.log('Generated 16 K:');
    const sixteenK: string[][] = generate16K(sixteenCD);

    console.log('\nGenerated R16L16:');
    const R16L16: string[] = generateR16L16(
      leftPlainTextIP,
      rightPlainTextIP,
      sixteenK
    );
    console.log(`R16L16 : ${R16L16.join(' | ')}\n`);

    const binaryCipherText: string[] = permutation(
      R16L16,
      finalPermutationMatrix,
      8
    );
    const hexCipherText: string[] = binaryToHEX(binaryCipherText);
    const stringCipherText: string[] = binaryToString(binaryCipherText);

    return {
      encryptionInBinary: binaryCipherText,
      encryptionInHEX: hexCipherText,
      encryptionInString: stringCipherText
    };
  }

  decrypt(cipherText: string[]): Decrypt {
    console.log(`Binary Cipher Text : ${cipherText.join(' | ')}`);
    console.log(`Key : ${this.key}\n`);

    const binaryKey: string[] = stringToBinary(this.key);
    console.log(`Binary Key : ${binaryKey.join(' | ')}\n`);

    const cipherTextIP: string[] = permutation(
      cipherText,
      initialPermutationMatrix,
      8
    );
    const leftCipherTextIP: string[] = cipherTextIP.slice(0, 4);
    const rightCipherTextIP: string[] = cipherTextIP.slice(4, 8);
    console.log(
      `Cipher Text Initial Permutation (IP) : ${cipherTextIP.join(' | ')}`
    );
    console.log(`Left (L0) : ${leftCipherTextIP.join(' | ')}`);
    console.log(`Right (R0) : ${rightCipherTextIP.join(' | ')}\n`);

    const keyPC1: string[] = permutation(binaryKey, permutedChoice1Matrix, 8);
    const leftKeyPC1: string[] = keyPC1.slice(0, 4);
    const rightKeyPC1: string[] = keyPC1.slice(4, 8);
    console.log(`Key Permuted Choice 1 (PC-1) : ${keyPC1.join(' | ')}`);
    console.log(`Left (C0) : ${leftKeyPC1.join(' | ')}`);
    console.log(`Right (D0) : ${rightKeyPC1.join(' | ')}\n`);

    console.log('Generated 16 CD:');
    const sixteenCD: string[][] = generate16CD(leftKeyPC1, rightKeyPC1);

    console.log('Generated 16 K:');
    let sixteenK: string[][] = generate16K(sixteenCD);
    sixteenK = sixteenK.reverse();

    console.log('\nGenerated R16L16:');
    const R16L16: string[] = generateR16L16(
      leftCipherTextIP,
      rightCipherTextIP,
      sixteenK
    );
    console.log(`R16L16 : ${R16L16.join(' | ')}\n`);

    let plainText: string[] = permutation(R16L16, finalPermutationMatrix, 8);
    plainText = binaryToString(plainText);

    return {
      decryptionInString: plainText
    };
  }
}
