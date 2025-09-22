import mongoose from "mongoose"; 

const comentariosSchema = new mongoose.Schema(
  {
    texto: { type: String, required: true },
    autor: { type: String, required: true },
    mansaoId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Mansao", 
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Comentarios", comentariosSchema);
