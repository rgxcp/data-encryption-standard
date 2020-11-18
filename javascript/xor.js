const nSplit = require('./n-split');

module.exports = async (left, right, returnLengthSize) => {
  left = await left.split('');
  right = await right.split('');

  let result = await left.map((value, index) => value ^ right[index]);
  result = await nSplit(result, returnLengthSize);

  return result;
};
