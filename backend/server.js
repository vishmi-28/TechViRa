const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const JWT_SECRET = process.env.JWT_SECRET;

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO contact (name, phone, message) VALUES (?, ?, ?)",
      [name, phone, message]
    );

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact Insert Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
});

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    console.error("JWT Error:", error);
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
    console.error("Fetch Contacts Error:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
