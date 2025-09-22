import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import methodOverride from "method-override";

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

routes(app);
connectDB();

export default app;