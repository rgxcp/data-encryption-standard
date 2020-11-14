module.exports = async (binary) => {
  const result = await binary.map((value) => String.fromCharCode(parseInt(value, 2)));

  return result;
};
