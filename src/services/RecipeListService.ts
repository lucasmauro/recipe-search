import {getPuppyRecipes, RecipePuppyResponse} from "./RecipePuppyService";
import {Request, Response} from 'express';
import getGif from "./GiphyService";

interface Recipe extends RecipePuppyResponse {
    gif: string,
}

interface RecipeResponse {
    keywords: string[],
    recipes: Recipe[],
}

const validateKeywords = (keywords: string[]) => {
    return keywords.length < 3;
}

const getRecipesGifs = async (puppyRecipes: RecipePuppyResponse[], recipes: Recipe[]) => {
    for (const puppyRecipe of puppyRecipes) {
        await getGif(puppyRecipe.title)
            .then((gif: string) => {
                recipes.push({
                    title: puppyRecipe.title,
                    ingredients: puppyRecipe.ingredients,
                    link: puppyRecipe.link,
                    gif: gif,
                });
            });
    }
}

export const getRecipeList = async (request: Request, response: Response): Promise<Response> => {
    const {i}: { i: string; } = request.query
    const keywords = i.split(',').sort();

    if (!validateKeywords(keywords)) {
        return response.status(400).json({
            status: 400,
            message: 'Please select up to 3 ingredients.',
        });
    }

    let puppyRecipes: RecipePuppyResponse[] = [];
    const recipes: Recipe[] = [];

    await getPuppyRecipes(keywords)
        .then(response => puppyRecipes = response);

    await getRecipesGifs(puppyRecipes, recipes);

    const recipeList: RecipeResponse = {
        keywords: keywords.sort(),
        recipes: recipes,
    };

    return response.status(200).json(recipeList);
};
