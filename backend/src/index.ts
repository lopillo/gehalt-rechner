// Backend entry point: start the HTTP server.
import { app } from "./app";

// Read the port from the environment or fall back to 4000.
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Start listening so the API can accept requests.
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});
