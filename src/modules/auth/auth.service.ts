import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import { generateToken } from "../../utils/generateToken";
// const authLogin = async ({email, password}: {email: string, password: string}) => {
    
//     const user = await prisma.user.findUnique({
//         where: {
//             email
//         }
//     });

//     if (!user) {
//         throw new Error("User not found!")
//     }

//     if (password === user.password) {
//         return user
//     }
//     else {
//         throw new Error("Password is incorrect!")
//     }
// }

const authLogin = async ({email, password}: {email: string, password: string}) => {

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken(String(user.id));

  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
};

// const verifyToken = (token: string): { userId: string } => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as { userId: string };
//   } catch (error) {
//     throw new Error("Invalid or expired token");
//   }
// };

export const AuthService = {
    authLogin,
    // verifyToken
}
