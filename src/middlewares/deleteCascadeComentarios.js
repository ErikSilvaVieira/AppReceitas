import comentarios from "../models/Comentarios.js";

export const deleteCascadeComentarios = async function() {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await comentarios.deleteMany({ mansaoId: doc._id });
  }
};