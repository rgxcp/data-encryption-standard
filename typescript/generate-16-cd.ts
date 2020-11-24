import { leftShift } from './left-shift';
import { rotationMatrix } from './matrix';

export const generate16CD = (
  leftKeyPC1: string[],
  rightKeyPC1: string[]
): string[][] => {
  const result: string[][] = [];

  for (let index in rotationMatrix) {
    leftKeyPC1 = leftShift(leftKeyPC1, rotationMatrix[index], 4);
    console.log(`C${parseInt(index) + 1} : ${leftKeyPC1.join(' | ')}`);
    rightKeyPC1 = leftShift(rightKeyPC1, rotationMatrix[index], 4);
    console.log(`D${parseInt(index) + 1} : ${rightKeyPC1.join(' | ')}`);
    const CiDi: string[] = leftKeyPC1.concat(rightKeyPC1);
    result.push(CiDi);
    console.log(
      `C${parseInt(index) + 1}D${parseInt(index) + 1} : ${CiDi.join(' | ')}\n`
    );
  }

  return result;
};
