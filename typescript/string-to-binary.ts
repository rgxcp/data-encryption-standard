import { addLeftBit } from './add-left-bit';

export const stringToBinary = (data: string): string[] => {
  const result: string[] = data.split('').map((value: string) => {
    let binary: string = value.charCodeAt(0).toString(2);
    binary = addLeftBit(binary, '0', 8);
    return binary;
  });

  return result;
};
