const permutedChoice2Matrix = require('./permuted-choice-2-matrix');
const permutation = require('./permutation');

module.exports = async (sixteenCD) => {
  // TODO: Change for loop with map instead
  const result = [];

  for (index in sixteenCD) {
    const chunk = await permutation(sixteenCD[index].join(''), permutedChoice2Matrix);
    console.log(`K${parseInt(index) + 1} : ${chunk.join(' | ')}`);
    result.push(chunk);
  }

  return result;
};
