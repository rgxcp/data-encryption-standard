export interface Encrypt {
  readonly encryptionInBinary: string[];
  readonly encryptionInHEX: string[];
  readonly encryptionInString: string[];
}

export interface Decrypt {
  readonly decryptionInString: string[];
}
