import { hash, verify } from "argon2";

const hashpw = async (password : string) : Promise<string> => {
    const hashedpaswword = await hash(password);
    return hashedpaswword;
};

const cmppw = async (password : string, hashedpw : string) : Promise<Boolean> => {
  return await verify(hashedpw, password);
};

export { hashpw, cmppw };
