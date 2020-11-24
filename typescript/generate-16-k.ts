import { permutedChoice2Matrix } from './matrix';
import { permutation } from './permutation';

export const generate16K = (sixteenCD: string[][]): string[][] => {
  const result: string[][] = [];

  for (let index in sixteenCD) {
    const Ki: string[] = permutation(
      sixteenCD[index],
      permutedChoice2Matrix,
      8
    );
    result.push(Ki);
    console.log(`K${parseInt(index) + 1} : ${Ki.join(' | ')}`);
  }

  return result;
};
