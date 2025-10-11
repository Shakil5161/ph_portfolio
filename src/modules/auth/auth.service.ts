import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import { generateToken } from "../../utils/generateToken";

const authLogin = async ({email, password}: {email: string, password: string}) => {

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(String(user.id));

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
};



export const AuthService = {
    authLogin,
}
