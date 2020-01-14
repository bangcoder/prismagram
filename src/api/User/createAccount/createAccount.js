// import { prisma } from "../../../../generated/pxrisma-client";

// export default {
//     Query: {
//         sayHello: async () => {
//             console.log(await prisma.users());
//             return "Hello";
//         }
//     }
// };

import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }]
      });
      if (exists) {
        throw Error("This username / email is already taken");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
      // return await prisma.user({ id });
    }
  }
};

// xport default {
//   Query: {
//     userById: async (_, args) => {
//       const { id } = args;
//       console.log(id);
//       return await prisma.user({ id });
//     }
//   }
// };
