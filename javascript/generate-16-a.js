const expansionMatrix = require('./expansion-matrix');
const finalPermutationMatrix = require('./final-permutation-matrix');
const permutationMatrix = require('./permutation-matrix');
const permutation = require('./permutation');
const sBoxesSubstitution = require('./s-boxes-substitution');
const xor = require('./xor');

module.exports = async (L0, R0, sixteenK) => {
  const A = [];
  const B = [];
  const PB = [];
  const R = [];
  let index = 0;

  for (; index < 16; index++) {
    const ERi = await permutation(index == 0 ? R0.join('') : R[index - 1].join(''), expansionMatrix);
    console.log(`E(R(${parseInt(index + 1)})-1) : ${ERi.join(' | ')}`);
    console.log(`K${parseInt(index + 1)}        : ${sixteenK[index].join(' | ')}`);
    const Ai = await xor(ERi.join(''), sixteenK[index].join(''));
    A.push(Ai);
    console.log('--------------------------------------------------------------------------------- XOR');
    console.log(`A${parseInt(index + 1)}        : ${Ai.join(' | ')}\n`);
    const Bi = await sBoxesSubstitution(Ai);
    B.push(Bi);
    console.log(`B${parseInt(index) + 1}        : ${Bi.join(' | ')}\n`);
    const PBi = await permutation(Bi.join(''), permutationMatrix, 4);
    PB.push(PBi);
    console.log(`P(B${parseInt(index) + 1})     : ${PBi.join(' | ')}`);
    if (index == 0) {
      const Ri = await xor(PBi.join(''), L0.join(''), 4);
      R.push(Ri);
      console.log(`L(${parseInt(index + 1)})-1)   : ${L0.join(' | ')}`);
      console.log('------------------------------------------------------ XOR');
      console.log(`R${parseInt(index) + 1}        : ${Ri.join(' | ')}\n`);
    } else if (index == 1) {
      const Ri = await xor(PBi.join(''), R0.join(''), 4);
      R.push(Ri);
      console.log(`L(${parseInt(index + 1)})-1)   : ${R0.join(' | ')}`);
      console.log('------------------------------------------------------ XOR');
      console.log(`R${parseInt(index) + 1}        : ${Ri.join(' | ')}\n`);
    } else {
      const Ri = await xor(PBi.join(''), R[index - 2].join(''), 4);
      R.push(Ri);
      console.log(`L(${parseInt(index + 1)})-1    : ${R[index - 2].join(' | ')}`);
      console.log('------------------------------------------------------ XOR');
      console.log(`R${parseInt(index) + 1}        : ${Ri.join(' | ')}\n`);
    }
  }

  const cipherText = await permutation([].concat(R[15], R[14]).join(''), finalPermutationMatrix);

  return cipherText;
};
