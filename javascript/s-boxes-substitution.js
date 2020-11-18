const sBoxesMatrix = require('./s-boxes-matrix');
const addLeftBit = require('./add-left-bit');
const binaryToDecimal = require('./binary-to-decimal');
const decimalToBinary = require('./decimal-to-binary');

module.exports = async (Ai) => {
  // TODO: Change for loop with map instead
  const result = [];

  for (index in Ai) {
    const data = await Ai[index].split('');
    const column = binaryToDecimal(data.splice(1, 4).join(''));
    const row = binaryToDecimal(data.join(''));
    let binary = decimalToBinary(sBoxesMatrix[index][row][column]);
    binary = addLeftBit(binary, '0', 4);
    result.push(binary);
  }

  return result;
};
