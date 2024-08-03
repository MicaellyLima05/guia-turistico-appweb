import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
      const userId = 6;
  
      const deletedUser = await prisma.tb_ATRATIVOS.delete({
        where: { id: userId },
      });
  
      console.log('User deleted:', deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  
  main();