import { compareSync, hashSync } from "bcryptjs";

export const hash = (password: string) => {
  return hashSync(password);
};

export const compareHash = (password: string, encryptedPassword: string) => {
  return compareSync(password, encryptedPassword);
};
