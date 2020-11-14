module.exports = async (binary) => {
  const result = await binary.map((value) => parseInt(value, 2).toString(16).toUpperCase());

  return result;
};
