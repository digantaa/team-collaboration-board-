import express from "express";
import Board from "../models/board.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
