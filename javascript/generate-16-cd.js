const rotationMatrix = require('./rotation-matrix');
const leftShift = require('./left-shift');

module.exports = async (leftKeyPC1, rightKeyPC1) => {
  // TODO: Change for loop with map instead
  const result = [];

  for (index in rotationMatrix) {
    leftKeyPC1 = await leftShift(leftKeyPC1.join(''), rotationMatrix[index], 4);
    console.log(`C${parseInt(index) + 1} : ${leftKeyPC1.join(' | ')}`);
    rightKeyPC1 = await leftShift(rightKeyPC1.join(''), rotationMatrix[index], 4);
    console.log(`D${parseInt(index) + 1} : ${rightKeyPC1.join(' | ')}`);
    const CiDi = await leftKeyPC1.concat(rightKeyPC1);
    result.push(CiDi);
    console.log(`C${parseInt(index) + 1}D${parseInt(index) + 1} : ${CiDi.join(' | ')}\n`);
  }

  return result;
};
