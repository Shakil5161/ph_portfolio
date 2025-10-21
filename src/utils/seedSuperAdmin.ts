import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const seedSuperAdmin = async () => {
    try {
        
        const adminEmail = 'shakil@portfolio.com'
        
        
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail }
        })

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('51613236@Portfolio', 12)
            
            await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: 'Portfolio Owner',
                role: 'OWNER'
            }
            })
            
            console.log('✅ Admin user created successfully!')
            console.log('Email: shakil@portfolio.com')
        } else {
            console.log('ℹ️  Admin user already exists')
        }

    } catch (error) {
        console.log(error)
    }
}