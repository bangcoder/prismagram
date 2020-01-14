import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: ({ id }) => prisma.room({ id }).participants(),
    messages: ({ id }) => prisma.room({ id }).messages()
  },
  Message: {
    from: ({ id }) => prisma.message({ id }).from(),
    to: ({ id }) => prisma.message({ id }).to()
  }
};
