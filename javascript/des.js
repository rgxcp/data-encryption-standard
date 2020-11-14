const initialPermutationMatrix = require('./initial-permutation-matrix');
const permutedChoice1Matrix = require('./permuted-choice-1-matrix');
const binaryToHexadecimal = require('./binary-to-hexadecimal');
const binaryToString = require('./binary-to-string');
const generate16A = require('./generate-16-a');
const generate16CD = require('./generate-16-cd');
const generate16K = require('./generate-16-k');
const permutation = require('./permutation');
const stringToBinary = require('./string-to-binary');

exports.encrypt = async (plainText, key) => {
  console.log(`Plain Text : ${plainText}`);
  console.log(`Key : ${key}\n`);

  // Step 1: Convert plain text and key into binary
  const binaryPlainText = await stringToBinary(plainText);
  // const binaryPlainText = ['01000011', '01001111', '01001101', '01010000', '01010101', '01010100', '01000101', '01010010'];
  console.log(`Binary Plain Text : ${binaryPlainText.join(' | ')}`);

  const binaryKey = await stringToBinary(key);
  // const binaryKey = ['00010011', '00110100', '01010111', '01111001', '10011011', '10111100', '11011111', '11110001'];
  console.log(`Binary Key : ${binaryKey.join(' | ')}\n`);

  // Step 2: Permute binary plain text with IP matrix
  // Step 2: Slice the result into left and right
  const plainTextIP = await permutation(binaryPlainText.join(''), initialPermutationMatrix);
  const leftPlainTextIP = plainTextIP.slice(0, 4);
  const rightPlainTextIP = plainTextIP.slice(4, 8);
  console.log(`Plain Text Initial Permutation (IP) : ${plainTextIP.join(' | ')}`);
  console.log(`Left IP (L0) : ${leftPlainTextIP.join(' | ')}`);
  console.log(`Right IP (R0) : ${rightPlainTextIP.join(' | ')}\n`);

  // Step 3: Generate key (permute binary key) with PC-1 matrix
  // Step 3: Slice the result into left and right
  const keyPC1 = await permutation(binaryKey.join(''), permutedChoice1Matrix);
  let leftKeyPC1 = keyPC1.slice(0, 4);
  let rightKeyPC1 = keyPC1.slice(4, 8);
  console.log(`Key Permuted Choice 1 (PC-1) : ${keyPC1.join(' | ')}`);
  console.log(`Left PC-1 (C0) : ${leftKeyPC1.join(' | ')}`);
  console.log(`Right PC-1 (D0) : ${rightKeyPC1.join(' | ')}\n`);

  // Step 4: Left shift C0 and D0 with Shift matrix
  // Step 4: Combine left shift result Cn and Dn as one
  console.log('Generated 16 CD:');
  const sixteenCD = await generate16CD(leftKeyPC1, rightKeyPC1);

  // Step 5: Permute each left shift combined result with PC-2 matrix
  console.log('Generated 16 K:');
  const sixteenK = await generate16K(sixteenCD);

  // Step 6:
  console.log('\nGenerated 16 A:');
  const cipherText = await generate16A(leftPlainTextIP, rightPlainTextIP, sixteenK);
  const hexCipherText = await binaryToHexadecimal(cipherText);
  const stringCipherText = await binaryToString(cipherText);

  // TODO: Return this with actual cipher text
  return {
    encryptionInBinary: cipherText,
    encryptionInHEX: hexCipherText,
    encryptionInText: stringCipherText
  };
};

exports.decrypt = async (cipherText, key) => {
  return key;
};
