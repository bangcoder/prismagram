import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    userById: async (_, args) => {
      const { id } = args;
      console.log(id);
      return await prisma.user({ id });
    }
  }
};
