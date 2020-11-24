const { permutedChoice2Matrix } = require('./matrix');
const permutation = require('./permutation');

module.exports = async (sixteenCD) => {
  // TODO: Change for loop with map instead
  const result = [];

  for (index in sixteenCD) {
    const Ki = await permutation(sixteenCD[index].join(''), permutedChoice2Matrix, 8);
    result.push(Ki);
    console.log(`K${parseInt(index) + 1} : ${Ki.join(' | ')}`);
  }

  return result;
};
