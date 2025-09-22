import express from "express";
import ctrl from "../controllers/comentariosController.js";
import comentariosController from "../controllers/comentariosController.js";

const router = express.Router();

router.post("/", ctrl.createComentarios);
router.delete("/:id", ctrl.deleteComentarios);

export default router;
