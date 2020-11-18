module.exports = (data, char, returnLengthSize) => {
  return char.repeat(returnLengthSize - data.length) + data;
};
