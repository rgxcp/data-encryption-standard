const nSplit = require('./n-split');

module.exports = async (data, length) => {
  data = await data.split('');

  let result = await data.concat(data.splice(0, length));

  result = await nSplit(result, 4);

  return result;
};
