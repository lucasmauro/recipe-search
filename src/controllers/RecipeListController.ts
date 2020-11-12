import {Request, Response} from "express";
import {getRecipeList} from '../services/RecipeService'

export const getRecipes = async (request: Request, response: Response) => {
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
};
