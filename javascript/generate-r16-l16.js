const expansionMatrix = require('./expansion-matrix');
const permutationMatrix = require('./permutation-matrix');
const permutation = require('./permutation');
const sBoxesSubstitution = require('./s-boxes-substitution');
const xor = require('./xor');

module.exports = async (L0, R0, sixteenK) => {
  const sixteenR = [];
  let index = 0;

  for (; index < 16; index++) {
    const ERi = await permutation(index == 0 ? R0.join('') : sixteenR[index - 1].join(''), expansionMatrix, 8);
    console.log(`E(R(${parseInt(index) + 1})-1) : ${ERi.join(' | ')}`);
    console.log(`K${parseInt(index) + 1}        : ${sixteenK[index].join(' | ')}`);
    console.log('--------------------------------------------------------------------------------- XOR');
    const Ai = await xor(ERi.join(''), sixteenK[index].join(''), 8);
    console.log(`A${parseInt(index) + 1}        : ${Ai.join(' | ')}\n`);

    const Bi = await sBoxesSubstitution(Ai);
    console.log(`B${parseInt(index) + 1}        : ${Bi.join(' | ')}\n`);

    const PBi = await permutation(Bi.join(''), permutationMatrix, 4);
    console.log(`P(B${parseInt(index) + 1})     : ${PBi.join(' | ')}`);
    let Li = [];
    switch (index) {
      case 0:
        Li = L0;
        break;
      case 1:
        Li = R0;
        break;
      default:
        Li = sixteenR[index - 2];
    }
    console.log(`L(${parseInt(index) + 1})-1)   : ${Li.join(' | ')}`);
    console.log('------------------------------------------------------ XOR');
    const Ri = await xor(PBi.join(''), Li.join(''), 4);
    sixteenR.push(Ri);
    console.log(`R${parseInt(index) + 1}        : ${Ri.join(' | ')}\n`);
  }

  const result = [].concat(sixteenR[15], sixteenR[14]);

  return result;
};
