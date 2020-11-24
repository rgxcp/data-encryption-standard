module.exports = (data, char, returnLengthSize) => char.repeat(returnLengthSize - data.length) + data;
