import pool from "../db/index";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

// Register a new user
export async function registerUser(username: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, role",
    [username, email, hashedPassword]
  );

  return result.rows[0]; 
}

// Login user
export async function loginUser(email: string, password: string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rows.length === 0) return null; 

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return null; 
  const token = generateToken(user); 
  return { user: { id: user.id, username: user.username, role: user.role }, token };
}
