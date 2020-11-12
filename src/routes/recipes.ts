import Router from 'express';
import {getRecipes} from "../controllers/RecipeListController";


const routes = Router();

routes.get('/recipes', getRecipes);

export default routes;
