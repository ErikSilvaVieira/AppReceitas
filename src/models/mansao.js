import mongoose from "mongoose"; 
import { deleteCascadeComentarios } from "../middlewares/deleteCascadeComentarios.js"; 

const mansaoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    localizacao: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String },
    imagem: { type: String },
    categoria: { 
      type: String, 
      enum: ["Mansão", "Mansão Premium", "Mansão Premium Plus", "Outro"],
      required: true 
    }
  },
  { timestamps: true, versionKey: false }
);

mansaoSchema.pre("findOneAndDelete", deleteCascadeComentarios);
mansaoSchema.pre("deleteOne", { document: false, query: true }, deleteCascadeComentarios);

export default mongoose.model("Mansao", mansaoSchema);
