const nSplit = require('./n-split');

module.exports = async (left, right, blockSize) => {
  left = left.split('');
  right = right.split('');

  let result = await left.map((value, index) => value ^ right[index]);

  // TODO: Pass block size param when calling this method
  result = await nSplit(result, blockSize != null ? blockSize : 8);

  return result;
};
