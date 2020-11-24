import { nSplit } from './n-split';

export const leftShift = (
  data: string[],
  rotationSize: number,
  returnLengthSize: number
): string[] => {
  data = data.join('').split('');

  let result: string[] = data.concat(data.splice(0, rotationSize));
  result = nSplit(result, returnLengthSize);

  return result;
};
