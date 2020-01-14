import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You Can NOT do that");
      }
    }
  }
};

// export default {
//     Mutation: {
//         editUser: async (_, args, { request, isAuthenticated }) => {
//             isAuthenticated(request);
//             const { username, email, firstName, lastName, bio } = args;
//             const { user } = request;
//             return prisma.updateUser({
//                 where: { id: user.id },
//                 data: { username, email, firstName, lastName, bio }
//             });
//         }
//     }
// };
