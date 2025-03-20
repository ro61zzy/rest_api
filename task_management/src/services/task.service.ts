//src/services/task.service.ts
import pool from "../db/index";

// Get tasks
export async function getTasks(user: any) {
  if (user.role === "admin") {
    return (await pool.query("SELECT * FROM tasks")).rows;
  } else {
    return (await pool.query("SELECT * FROM tasks WHERE user_id = $1", [user.id])).rows;
  }
}

// Create a task
export async function createTask({ title, description, userId }: { title: string; description: string; userId: number }) {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId]
  );
  return result.rows[0];
}

// Delete a task
export async function deleteTask(id: string) {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
}
