import express from "express";
import router from "./routes/routes.js";

const app = express();
const port = 5000;

// Middleware to parse request body as JSON
app.use(express.json());

// Mount the router on a specific path
app.use("/api", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
