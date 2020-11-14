const shiftMatrix = require('./shift-matrix');
const leftShift = require('./left-shift');

module.exports = async (C0, D0) => {
  // TODO: Change for loop with map instead
  const result = [];

  for (index in shiftMatrix) {
    C0 = await leftShift(C0.join(''), shiftMatrix[index]);
    D0 = await leftShift(D0.join(''), shiftMatrix[index]);
    console.log(`C${parseInt(index) + 1} : ${C0.join(' | ')}`);
    console.log(`D${parseInt(index) + 1} : ${D0.join(' | ')}`);
    const chunk = await C0.concat(D0);
    console.log(`C${parseInt(index) + 1}D${parseInt(index) + 1} : ${chunk.join(' | ')} \n`);
    result.push(chunk);
  }

  return result;
};
