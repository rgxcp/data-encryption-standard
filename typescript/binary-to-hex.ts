export const binaryToHEX = (binary: string[]): string[] => {
  const result: string[] = binary.map((value: string) =>
    parseInt(value, 2).toString(16).toUpperCase()
  );

  return result;
};
