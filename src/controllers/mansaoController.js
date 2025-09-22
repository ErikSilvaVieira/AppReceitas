import Mansao from "../models/mansao.js";
import Comentarios from "../models/Comentarios.js";

class mansaoController {
  static listMansao = async (req, res, next) => {
    try {
      const q = (req.query.q || "").trim();
      const filtro = q
        ? {
            $or: [
              { nome: { $regex: q, $options: "i" } },
              { localizacao: { $regex: q, $options: "i" } },
              { categoria: { $regex: q, $options: "i" } },
              { descricao: { $regex: q, $options: "i" } }
            ]
          }
        : {};
      const mansaos = await Mansao.find(filtro).lean();

      if (req.headers.accept?.includes("text/html")) {
        return res.render("pages/index", { title: "Dev Mansions", q, mansaos });
      }
      res.json(mansaos);
    } catch (e) {
      next(e);
    }
  };

  static listMansaoById = async (req, res, next) => {
    try {
      const mansao = await Mansao.findById(req.params.id).lean();
      if (!mansao) return res.status(404).render("pages/404", { title: "Não encontrada" });

      const comentarios = await Comentarios.find({ mansaoId: mansao._id }).lean();

      if (req.headers.accept?.includes("text/html")) {
        return res.render("pages/mansaoDetail", { title: mansao.nome, mansao, comentarios });
      }
      res.json({ mansao, comentarios });
    } catch (e) {
      next(e);
    }
  };

static createMansao = async (req, res, next) => {
  try {
    if (req.body.preco) {
      // remove todos os pontos e troca vírgula por ponto (caso venha decimal)
      req.body.preco = Number(
        req.body.preco.replace(/\./g, "").replace(",", ".")
      );
    }

    const nova = new Mansao(req.body);
    await nova.save();

    if (req.headers.accept?.includes("text/html")) {
      return res.redirect(`/mansao/${nova._id}`);
    }

    res.status(201).json(nova);
  } catch (e) {
    next(e);
  }
};

static updateMansao = async (req, res, next) => {
  try {
if (req.body.preco) {
  req.body.preco = Number(
    req.body.preco.replace(/\./g, "").replace(",", ".")
  );
}

    const atualizada = await Mansao.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!atualizada) {
      return res.status(404).render("pages/404", { title: "Não encontrada" });
    }

    if (req.headers.accept?.includes("text/html")) {
      return res.redirect(`/mansao/${req.params.id}`);
    }

    res.json({ message: "Atualizada", mansao: atualizada });
  } catch (e) {
    next(e);
  }
};
  static deleteMansao = async (req, res, next) => {
    try {
      const removida = await Mansao.findOneAndDelete({ _id: req.params.id });
      if (!removida) return res.status(404).render("pages/404", { title: "Não encontrada" });

      if (req.headers.accept?.includes("text/html")) return res.redirect("/");
      res.json({ message: "Removida" });
    } catch (e) {
      next(e);
    }
  };

  static editMansao = async (req, res, next) => {
    try {
      const mansao = await Mansao.findById(req.params.id).lean();
      if (!mansao) return res.status(404).render("pages/404", { title: "Não encontrada" });
      res.render("pages/mansaoEditForm", { title: `Editar: ${mansao.nome}`, mansao });
    } catch (e) {
      next(e);
    }
  };
}

export default mansaoController;
