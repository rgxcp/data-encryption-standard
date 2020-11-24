import { addLeftBit } from './add-left-bit';
import { binaryToDecimal } from './binary-to-decimal';
import { decimalToBinary } from './decimal-to-binary';
import { sBoxesMatrix } from './matrix';

export const sBoxesSubstitution = (Ai: string[]): string[] => {
  const result: string[] = [];

  for (let index in Ai) {
    const data: string[] = Ai[index].split('');
    const column: number = binaryToDecimal(data.splice(1, 4).join(''));
    const row: number = binaryToDecimal(data.join(''));
    let binary: string = decimalToBinary(sBoxesMatrix[index][row][column]);
    binary = addLeftBit(binary, '0', 4);
    result.push(binary);
  }

  return result;
};
