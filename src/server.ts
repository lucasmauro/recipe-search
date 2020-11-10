import dotenv from 'dotenv';
import express from 'express';
import routes from "./routes/recipes";

dotenv.config();
if (!process.env.GIPHY_API_KEY) {
    console.error("Giphy API Key not provided. Stopping execution.");
    process.exit(0);
}
if (!process.env.APP_PORT) {
    console.log("Application port not provided. Defaulting to 3333.");
}

const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.APP_PORT || 3333);
