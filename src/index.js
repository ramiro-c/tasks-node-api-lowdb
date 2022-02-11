import app from "./app.js";
import { createConnection } from "./database.js";

createConnection();

const PORT = 3002

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});
