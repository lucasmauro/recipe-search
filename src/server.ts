import express from 'express';

import getRecipeList from "./services/RecipeListService";

const app = express();

app.use(express.json());


app.get('/recipes', async (request, response) => {
    // @ts-ignore
    const {i}: { i: string; } = request.query

    const keywords = i.split(',').sort();

    let recipes;
    await getRecipeList(keywords).then(response => {
        recipes = response;
    });

    response.json(recipes);
});

app.listen(3333);
