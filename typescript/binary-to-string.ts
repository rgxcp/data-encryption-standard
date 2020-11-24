export const binaryToString = (binary: string[]): string[] => {
  const result: string[] = binary.map((value: string) =>
    String.fromCharCode(parseInt(value, 2))
  );

  return result;
};
