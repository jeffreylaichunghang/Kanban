const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class AuthService {
    constructor(prisma) {
        this.prisma = prisma
    }

    async findUserByEmail(email) {
        return await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }

    async deleteUser(email) {
        return await prisma.user.delete({
            where: {
                email: email
            }
        })
    }
}

module.exports = AuthService
