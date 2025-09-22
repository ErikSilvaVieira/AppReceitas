import express from "express";
import comentariosController from "../controllers/ComentariosController.js";

const router = express.Router();

router.post("/", comentariosController.createComentarios);
router.delete("/:id", comentariosController.deleteComentarios);

export default router;
