import {Request, Response} from "express";
import {getRecipeList} from '../services/RecipeService'
import GeneralError from "../errors/GeneralError";

export const getRecipes = async (request: Request, response: Response) => {
    let i = '';
    if (typeof request.query.i !== 'string') {
        throw new GeneralError(400, "Invalid input type.");
    }

    i = request.query.i
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
