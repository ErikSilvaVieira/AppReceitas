import Comentarios from "../models/Comentarios.js";

class comentariosController {
  static createComentarios = async (req, res, next) => {
    try {
      const comentario = new Comentarios(req.body);
      await comentario.save();
      if (req.headers.accept?.includes("text/html")) return res.redirect(`/mansao/${req.body.mansaoId}`);
      res.status(201).json(comentario);
    } catch (e) {
      next(e);
    }
  };

  static deleteComentarios = async (req, res, next) => {
    try {
      const removido = await Comentarios.findByIdAndDelete(req.params.id);
      if (!removido) return res.status(404).json({ message: "Comentário não encontrado" });

      if (req.headers.accept?.includes("text/html")) return res.redirect("back");
      res.json({ message: "Comentário removido" });
    } catch (e) {
      next(e);
    }
  };
}

export default comentariosController;
