import "./env";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
// import { sendSecretMail } from "./utils";
// import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleWare, uploadController } from "./upload";
// sendSecretMail("sunghoon.bang@alumni.utoronto.ca", "0235711");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleWare, uploadController);
// server.express.use(passport.authenticate("jwt"));
server.start({ port: PORT }, () =>
  console.log(`✅ Server running on port http:localhost:${PORT}`)
);
