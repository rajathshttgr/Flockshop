// server.js
import app from "./app.js";
import { createTables } from "./data/createTables.js";

const PORT = process.env.PORT || 4001;

//server running
createTables()
  .then(() => {
    console.log("Database setup completed.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to setup database:", err);
    process.exit(1);
  });
