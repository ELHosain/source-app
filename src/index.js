import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();

// 🔥 PORT dynamique pour Docker
const port = process.env.PORT || 3000;

app.use(express.json());

// 🔥 Connexion PostgreSQL via variables docker-compose
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "appdb",
});

// --- ROUTES ---

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  if (typeof a === "number" && typeof b === "number") {
    res.json({ result: a + b });
  } else {
    res.status(400).json({ error: "Invalid input" });
  }
});

// 🔥 Route test DB (très bien pour ton rendu TP)
app.get("/db", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW()");
    res.json({ db: "connected", time: r.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 healthcheck (bonus pro)
app.get("/health", (req, res) => res.json({ ok: true }));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
}

export default app;