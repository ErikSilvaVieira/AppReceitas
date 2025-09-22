import mongoose from "mongoose"; 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB.");
    } catch (error) {
        console.log("Erro ao contactar ao MongoDB.", error);
    }
};

export default connectDB;