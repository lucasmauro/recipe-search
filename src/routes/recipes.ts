import Router from 'express';
import {getRecipeList} from "../services/RecipeListService";


const routes = Router();

routes.get('/recipes', getRecipeList);

export default routes;
