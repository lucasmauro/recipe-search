import Router from 'express';
import getRecipeList from "../services/RecipeListService";

const routes = Router();

routes.get('/recipes', async (request, response) => {
    // @ts-ignore
    const {i}: { i: string; } = request.query

    const keywords = i.split(',').sort();

    let recipes;
    await getRecipeList(keywords).then(response => {
        recipes = response;
    });

    response.status(200).json(recipes);
});

export default routes;