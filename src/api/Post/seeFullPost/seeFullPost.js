import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      // const user = await prisma.user({ id });
      return prisma.post({ id });
    }
  }
};
