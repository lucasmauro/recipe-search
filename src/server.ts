import dotenv from 'dotenv';
import express from 'express';
import routes from "./routes/recipes";

dotenv.config();

let fatal_errors = []
if (!process.env.GIPHY_API_KEY) {
    fatal_errors.push("Giphy API Key not provided.");
}

if (!process.env.GIPHY_API_ENDPOINT) {
    fatal_errors.push("Giphy API Endpoint not provided.");
}

if (!process.env.RECIPE_PUPPY_API_ENDPOINT) {
    fatal_errors.push("Recipe Puppy Endpoint not provided.");
}

if (fatal_errors.length > 0) {
    fatal_errors.forEach(error => console.log(error));
    process.exit(1);
}

if (!process.env.APP_PORT) {
    console.log("Application port not provided. Defaulting to 3333.");
}

const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.APP_PORT || 3333);
