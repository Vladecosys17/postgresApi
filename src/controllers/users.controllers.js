import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.json(rows);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(rows[0]);
};

export const exportUsers = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, lastname_p, lastname_m, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.name, data.lastname_p, data.lastname_m, data.phone]
    );

    return res.json(rows[0]);
  } catch (error) {
    console.log(error);

    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const exportUser = async (req, res) => {
  const { id } = req.params;
  const { rowsCount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowsCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rowsCount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowsCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name = $1, lastname_p = $2, lastname_m = $3, phone = $4 WHERE id = $5 RETURNING *",
    [data.name, data.lastname_p, data.lastname_m, data.phone, id]
  );

  return res.json(rows[0]);
};
