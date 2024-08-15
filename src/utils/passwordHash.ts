import { hash, compare } from "bcrypt";

const saltRounds: number = 10;

export const generateHashedPassword = async (password: string):Promise<string> => {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
};

export const checkPassword = async (password: string, hashedPassword: string):Promise<boolean>=> {
    const isBothEqual = await compare(password, hashedPassword);
    return isBothEqual
};
