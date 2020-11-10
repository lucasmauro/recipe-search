import Router from 'express';
import {getRecipeList} from "../controllers/RecipeListController";


const routes = Router();

routes.get('/recipes', getRecipeList);

export default routes;
