import { Router } from "express";
import {
  getUser,
  getUsers,
  exportUsers,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", exportUsers);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

export default router;
