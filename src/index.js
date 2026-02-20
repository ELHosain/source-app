// src/index.js
const express = require("express");

const app = express();
app.use(express.json());

// Route GET /
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Route POST /sum  { "a": 1, "b": 2 }
app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  // Validation
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  return res.status(200).json({ result: a + b });
});

// ✅ IMPORTANT : on exporte l'app pour les tests
module.exports = app;

// ✅ Lancer le serveur seulement si on exécute "node src/index.js"
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}