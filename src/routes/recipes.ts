import Router, {Request, Response} from 'express';
import {getRecipeList} from "../controllers/RecipeListController";


const routes = Router();

routes.get('/recipes', async (request: Request, response: Response) => {
    const {i}: { i: string; } = request.query
    const keywords = i.split(',').sort();

    await getRecipeList(keywords)
        .then(recipeList => {
            return response.status(200).json(recipeList);
        })
        .catch((error) => {
            return response
                .status(error.status)
                .json(error);
        });
});

export default routes;
