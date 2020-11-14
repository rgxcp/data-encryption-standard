const sBoxesMatrix = require('./s-boxes-matrix');

module.exports = async (data) => {
  const result = [];

  for (index in data) {
    const chunk = data[index].split('');
    const column = chunk.splice(1, 4).join('');
    const row = chunk.join('');
    const temp = sBoxesMatrix[index][parseInt(row, 2)][parseInt(column, 2)];
    let binaryResult = temp.toString(2);
    if (binaryResult.length == 1) {
      binaryResult = '000' + binaryResult;
    } else if (binaryResult.length == 2) {
      binaryResult = '00' + binaryResult;
    } else if (binaryResult.length == 3) {
      binaryResult = '0' + binaryResult;
    } else {
      binaryResult = binaryResult;
    }
    result.push(binaryResult);
  }

  return result;
};
