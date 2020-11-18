module.exports = async (data, returnLengthSize) => {
  const result = [];
  const indexSize = Math.ceil(data.length / returnLengthSize);
  let index = 0;

  while (index < data.length) {
    const chunk = await data.slice(index, (index += indexSize)).join('');
    result.push(chunk);
  }

  return result;
};
