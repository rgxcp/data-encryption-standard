const addLeftBit = require('./add-left-bit');

module.exports = async (string) => {
  const result = await string.split('').map((value) => {
    let binary = value.charCodeAt().toString(2);
    binary = addLeftBit(binary, '0', 8);
    return binary;
  });

  return result;
};
