const finalPermutationMatrix = require('./final-permutation-matrix');
const initialPermutationMatrix = require('./initial-permutation-matrix');
const permutedChoice1Matrix = require('./permuted-choice-1-matrix');
const binaryToHEX = require('./binary-to-hex');
const binaryToString = require('./binary-to-string');
const generate16CD = require('./generate-16-cd');
const generate16K = require('./generate-16-k');
const generateR16L16 = require('./generate-r16-l16');
const permutation = require('./permutation');
const stringToBinary = require('./string-to-binary');

exports.encrypt = async (plainText, key) => {
  console.log(`Plain Text : ${plainText}`);
  console.log(`Key : ${key}\n`);

  // Step 1: Convert plain text and key into binary
  const binaryPlainText = await stringToBinary(plainText);
  console.log(`Binary Plain Text : ${binaryPlainText.join(' | ')}`);

  const binaryKey = await stringToBinary(key);
  console.log(`Binary Key : ${binaryKey.join(' | ')}\n`);

  // Step 2.1: Permute binary plain text with IP matrix
  // Step 2.2: Split result into left and right
  const plainTextIP = await permutation(binaryPlainText.join(''), initialPermutationMatrix, 8);
  const leftPlainTextIP = plainTextIP.slice(0, 4);
  const rightPlainTextIP = plainTextIP.slice(4, 8);
  console.log(`Plain Text Initial Permutation (IP) : ${plainTextIP.join(' | ')}`);
  console.log(`Left (L0) : ${leftPlainTextIP.join(' | ')}`);
  console.log(`Right (R0) : ${rightPlainTextIP.join(' | ')}\n`);

  // Step 3.1: Generate key (permute binary key) with PC-1 matrix
  // Step 3.2: Split result into left and right
  const keyPC1 = await permutation(binaryKey.join(''), permutedChoice1Matrix, 8);
  const leftKeyPC1 = keyPC1.slice(0, 4);
  const rightKeyPC1 = keyPC1.slice(4, 8);
  console.log(`Key Permuted Choice 1 (PC-1) : ${keyPC1.join(' | ')}`);
  console.log(`Left (C0) : ${leftKeyPC1.join(' | ')}`);
  console.log(`Right (D0) : ${rightKeyPC1.join(' | ')}\n`);

  // Step 4.1: Left shift C0 and D0 with Rotation matrix
  // Step 4.2: Combine each result as one
  console.log('Generated 16 CD:');
  const sixteenCD = await generate16CD(leftKeyPC1, rightKeyPC1);

  // Step 5: Permute each CiDi with PC-2 matrix
  console.log('Generated 16 K:');
  const sixteenK = await generate16K(sixteenCD);

  // Step 6.1: Expand R(i)-1 with Expansion matrix = E(Ri)
  //           R0 = rightPlainTextIP
  //           R1..16 = Step 6.5
  // Step 6.2: XOR E(Ri) with Ki = Ai
  // Step 6.3: Substitute each index of Ai with S-Boxes matrix = Bi
  // Step 6.4: Permute Bi with Permutation matrix = P(Bi)
  // Step 6.5: XOR P(Bi) with L(i)-1 = Ri
  //           L0 = leftPlainTextIP
  //           L1 = rightPlainTextIP
  //           L2..16 = R(i)-2
  // Step 6.6: Repeat 15 times
  console.log('\nGenerated R16L16:');
  const R16L16 = await generateR16L16(leftPlainTextIP, rightPlainTextIP, sixteenK);
  console.log(`R16L16 : ${R16L16.join(' | ')}\n`);

  // Step 7.1: Permute R16L16 with Final Permutation matrix
  // Step 7.2 (Optional): Convert result into HEX and String
  const binaryCipherText = await permutation(R16L16.join(''), finalPermutationMatrix, 8);
  const hexCipherText = await binaryToHEX(binaryCipherText);
  const stringCipherText = await binaryToString(binaryCipherText);

  return {
    encryptionInBinary: binaryCipherText,
    encryptionInHEX: hexCipherText,
    encryptionInString: stringCipherText
  };
};

exports.decrypt = async (cipherText, key) => {
  console.log(`Binary Cipher Text : ${cipherText.join(' | ')}`);
  console.log(`Key : ${key}\n`);

  const binaryKey = await stringToBinary(key);
  console.log(`Binary Key : ${binaryKey.join(' | ')}\n`);

  const cipherTextIP = await permutation(cipherText.join(''), initialPermutationMatrix, 8);
  const leftCipherTextIP = cipherTextIP.slice(0, 4);
  const rightCipherTextIP = cipherTextIP.slice(4, 8);
  console.log(`Cipher Text Initial Permutation (IP) : ${cipherTextIP.join(' | ')}`);
  console.log(`Left (L0) : ${leftCipherTextIP.join(' | ')}`);
  console.log(`Right (R0) : ${rightCipherTextIP.join(' | ')}\n`);

  const keyPC1 = await permutation(binaryKey.join(''), permutedChoice1Matrix, 8);
  const leftKeyPC1 = keyPC1.slice(0, 4);
  const rightKeyPC1 = keyPC1.slice(4, 8);
  console.log(`Key Permuted Choice 1 (PC-1) : ${keyPC1.join(' | ')}`);
  console.log(`Left (C0) : ${leftKeyPC1.join(' | ')}`);
  console.log(`Right (D0) : ${rightKeyPC1.join(' | ')}\n`);

  console.log('Generated 16 CD:');
  const sixteenCD = await generate16CD(leftKeyPC1, rightKeyPC1);

  console.log('Generated 16 K:');
  let sixteenK = await generate16K(sixteenCD);
  sixteenK = sixteenK.reverse();

  console.log('\nGenerated R16L16:');
  const R16L16 = await generateR16L16(leftCipherTextIP, rightCipherTextIP, sixteenK);
  console.log(`R16L16 : ${R16L16.join(' | ')}\n`);

  let plainText = await permutation(R16L16.join(''), finalPermutationMatrix, 8);
  plainText = binaryToString(plainText);

  return plainText;
};
