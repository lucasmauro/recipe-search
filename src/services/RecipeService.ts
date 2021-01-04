import {getPuppyRecipes, RecipePuppyResponse} from "./RecipePuppyService";
import getGif from "../services/GiphyService";
import GeneralError from "../errors/GeneralError";

interface Recipe extends RecipePuppyResponse {
    gif: string,
}

interface RecipeResponse {
    keywords: string[],
    recipes: Recipe[],
}

const validateKeywords = (keywords: string[]) => {
    return keywords.length <= 3 && keywords.length != 0;
}

const getRecipesGifs = async (puppyRecipes: RecipePuppyResponse[]) => {
    return await Promise.all(
        puppyRecipes.map(async (recipe) => {
                let gif = await getGif(recipe.title);

                return {
                    title: recipe.title,
                    ingredients: recipe.ingredients,
                    link: recipe.link,
                    gif: gif,
                }
            }
        ));
}

export const getRecipeList = async (keywords: string[]): Promise<RecipeResponse> => {
    keywords = await keywords.filter(item => item);
    if (!validateKeywords(keywords)) {
        throw new GeneralError(400, 'Please select up to 3 ingredients.').toJson();
    }

    let puppyRecipes: RecipePuppyResponse[] = [];
    let recipes: Recipe[] = [];

    await getPuppyRecipes(keywords)
        .then(response => puppyRecipes = response)
        .catch(() => {
            throw new GeneralError(503, 'Recipe Puppy is currently unavailable.').toJson();
        });

    await getRecipesGifs(puppyRecipes)
        .then(response => recipes = response)
        .catch(() => {
            throw new GeneralError(503, 'Giphy is currently unavailable.').toJson();
        });

    return {
        keywords: keywords.sort(),
        recipes: recipes,
    };
};
