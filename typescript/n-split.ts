export const nSplit = (data: string[], returnLengthSize: number): string[] => {
  const result: string[] = [];
  const indexSize: number = Math.ceil(data.length / returnLengthSize);
  let index: number = 0;

  while (index < data.length) {
    const chunk: string = data.slice(index, (index += indexSize)).join('');
    result.push(chunk);
  }

  return result;
};
