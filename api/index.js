import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { typeDefs } from "../backend/src/schema/typeDefs.js";
import { resolvers } from "../backend/src/resolvers/index.js";
import { connectDB } from "../backend/src/config/database.js";
import { authenticate } from "../backend/src/middleware/auth.js";
import { createEmployeeLoader } from "../backend/src/utils/dataloader.js";

let server = null;
let dbConnected = false;

async function initServer() {
  if (server) return server;

  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
    console.log("Database connected successfully");
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  const app = express();

  const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean);

  const graphQLHandler = expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      const { employee } = await authenticate(req);
      return {
        employee,
        loaders: {
          employeeLoader: createEmployeeLoader(),
        },
      };
    },
  });

  app.use(
    "/graphql",
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : true,
      credentials: true,
    }),
    express.json(),
    graphQLHandler
  );

  app.use(
    "/api/graphql",
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : true,
      credentials: true,
    }),
    express.json(),
    graphQLHandler
  );

  app.get("/", (_req, res) => {
    res.json({ message: "GraphQL API Server" });
  });

  server = { app, apolloServer };
  return server;
}

export default async function handler(req, res) {
  const { app } = await initServer();
  return app(req, res);
}
