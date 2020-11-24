import { nSplit } from './n-split';

export const xor = (
  left: string[],
  right: string[],
  returnLengthSize: number
): string[] => {
  left = left.join('').split('');
  right = right.join('').split('');

  let result: string[] = left.map((value: string, index: number) => {
    const chunk: number = parseInt(value) ^ parseInt(right[index]);
    return chunk.toString();
  });
  result = nSplit(result, returnLengthSize);

  return result;
};
