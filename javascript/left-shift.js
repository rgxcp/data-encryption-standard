const nSplit = require('./n-split');

module.exports = async (data, rotationSize, returnLengthSize) => {
  data = await data.split('');

  let result = await data.concat(data.splice(0, rotationSize));
  result = await nSplit(result, returnLengthSize);

  return result;
};
