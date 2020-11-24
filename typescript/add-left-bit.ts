export const addLeftBit = (
  data: string,
  char: string,
  returnLengthSize: number
): string => char.repeat(returnLengthSize - data.length) + data;
