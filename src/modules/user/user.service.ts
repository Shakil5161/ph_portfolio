import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {

    const { email, password, ...rest} = payload

    const isUserExist = await prisma.user.findUnique({
        where:{email}
    })

    const hashedPassword = await bcrypt.hash(password as string, 12)
    
    if(isUserExist){
         throw new Error("User already exists")
    }
    
    const createUser = await prisma.user.create({
         data: {
            email,
            password: hashedPassword,
            ...rest
        }
    })
    return createUser
    
}

export const UserService = {
    createUser,
    

}