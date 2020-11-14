const nSplit = require('./n-split');

module.exports = async (data, matrix, blockSize) => {
  data = await data.split('');

  let result = await matrix.map((value) => data[value - 1]);

  // TODO: Pass block size param when calling this method
  result = await nSplit(result, blockSize != null ? blockSize : 8);

  return result;
};
