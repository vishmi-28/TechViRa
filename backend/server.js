const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vishmi2828",
  database: "world",
});

const JWT_SECRET = "techvira_admin_secret";


app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      message: "Login successful"
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


app.post("/api/contact", async (req, res) => {
  const { name, phone, message } = req.body;

  try {
    await db.query(
      "INSERT INTO contact (name, phone, message) VALUES (?, ?, ?)",
      [name, phone, message]
    );

   
    res.json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});


const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};


app.get("/api/admin/contacts", verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, phone, message, created_at FROM contact ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
});

app.listen(5000, () => {
  console.log(" Backend running on http://localhost:5000");
});
