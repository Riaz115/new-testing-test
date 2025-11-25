import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./resolvers/index.js";
import { connectDB } from "./config/database.js";
import { authenticate } from "./middleware/auth.js";
import { createEmployeeLoader } from "./utils/dataloader.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();
console.log("Database connected successfully");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.get("/", (_req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const { employee } = await authenticate(req);
      return {
        employee,
        loaders: {
          employeeLoader: createEmployeeLoader(),
        },
      };
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
