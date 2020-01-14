import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    isLiked: (parent, __, { request }) => {
      const { user } = request;
      const { id } = parent;
      try {
        return prisma.$exists.like({
          AND: [{ user: { id: user.id } }, { post: { id } }]
        });
      } catch {
        return false;
      }
    },
    likeCount: parent =>
      prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count()
  }
};

// const likeCount = await prisma
//   .likesConnection({ where: { post: { id } } })
//   .aggregate()
//   .count();
