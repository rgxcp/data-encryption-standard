module.exports = async (string) => {
  const result = await string.split('').map((value) => {
    const binary = value.charCodeAt().toString(2);
    return binary.length == 7
      ? `0${binary}`
      : `00${binary}`;
  });

  return result;
};
