const nSplit = require('./n-split');

module.exports = async (data, matrix, returnLengthSize) => {
  data = await data.split('');

  let result = await matrix.map((value) => data[value - 1]);
  result = await nSplit(result, returnLengthSize);

  return result;
};
