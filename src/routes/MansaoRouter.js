import express from "express";
import ctrl from "../controllers/mansaoController.js";

const router = express.Router();

router.get("/", ctrl.listMansao);
router.get("/new", (req, res) => res.render("pages/mansaoFormulario", { title: "Nova Mansão" }));
router.get("/:id", ctrl.listMansaoById);
router.get("/:id/edit", ctrl.editMansao);

router.post("/", ctrl.createMansao);
router.put("/:id", ctrl.updateMansao);
router.delete("/:id", ctrl.deleteMansao);

export default router;
