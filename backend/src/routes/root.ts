import { Router } from "express";
import * as path from "path";
const router = Router();

router.get("^/$|/index(.html)?", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

export default router;
