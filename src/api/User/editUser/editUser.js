import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar },
      });
    },
  },
};

// isAuthenticated는 server.js에서 context 로 지정해 주므로 import 로 인한 정의가 별도로 필요하지 않음.
