import { nSplit } from './n-split';

export const permutation = (
  data: string[],
  matrix: number[],
  returnLengthSize: number
): string[] => {
  data = data.join('').split('');

  let result: string[] = matrix.map((value: number) => data[value - 1]);
  result = nSplit(result, returnLengthSize);

  return result;
};
