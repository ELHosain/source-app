const express = require("express");

const app = express();
app.use(express.json());

/**
 * Route test
 */
app.get("/", (req, res) => {
  res.send("Hello world!");
});

/**
 * Route POST /sum
 */
app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  res.json({ result: a + b });
});

/**
 * ✅ Export app pour les tests (SUPER IMPORTANT)
 */
module.exports = app;

/**
 * ✅ Lance le serveur seulement hors tests / CI
 */
if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}