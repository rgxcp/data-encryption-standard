import { expansionMatrix, permutationMatrix } from './matrix';
import { permutation } from './permutation';
import { sBoxesSubstitution } from './s-boxes-substitution';
import { xor } from './xor';

export const generateR16L16 = (
  L0: string[],
  R0: string[],
  sixteenK: string[][]
): string[] => {
  const sixteenR: string[][] = [];

  for (let index = 0; index < 16; index++) {
    const ERi: string[] = permutation(
      index == 0 ? R0 : sixteenR[index - 1],
      expansionMatrix,
      8
    );
    console.log(`E(R(${index + 1})-1) : ${ERi.join(' | ')}`);
    console.log(`K${index + 1}        : ${sixteenK[index].join(' | ')}`);
    console.log(
      '--------------------------------------------------------------------------------- XOR'
    );
    const Ai: string[] = xor(ERi, sixteenK[index], 8);
    console.log(`A${index + 1}        : ${Ai.join(' | ')}\n`);

    const Bi: string[] = sBoxesSubstitution(Ai);
    console.log(`B${index + 1}        : ${Bi.join(' | ')}\n`);

    const PBi: string[] = permutation(Bi, permutationMatrix, 4);
    console.log(`P(B${index + 1})     : ${PBi.join(' | ')}`);
    let Li: string[] = [];
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
    console.log(`L(${index + 1})-1)   : ${Li.join(' | ')}`);
    console.log('------------------------------------------------------ XOR');
    const Ri: string[] = xor(PBi, Li, 4);
    sixteenR.push(Ri);
    console.log(`R${index + 1}        : ${Ri.join(' | ')}\n`);
  }

  const result: string[] = [].concat(sixteenR[15], sixteenR[14]);

  return result;
};
