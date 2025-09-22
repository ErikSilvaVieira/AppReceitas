import express from "express";
import Mansao from "../models/mansao.js";
import mansaoRouter from "./MansaoRouter.js";
import comentariosRouter from "./ComentariosRouter.js";

const router = express.Router();

export default (app) => {
  app.use("/", router);

  router.get("/", async (req, res, next) => {
    try {
      const mansaos = await Mansao.find().lean();
      res.render("pages/index", { title: "Dev Mansions", q: "", mansaos });
    } catch (e) {
      next(e);
    }
  });

  app.use("/mansao", mansaoRouter);
  app.use("/comentarios", comentariosRouter);

  app.use((req, res) => res.status(404).render("pages/404", { title: "404" }));
};
