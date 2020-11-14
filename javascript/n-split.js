module.exports = async (data, size) => {
  let result = [];
  let index = 0;
  const chunkSize = data.length / size;

  while (index < data.length) {
    const chunk = await data.slice(index, (index += chunkSize)).join('');
    result.push(chunk);
  }

  return result;
};
