import {getPuppyRecipes, RecipePuppyResponse} from "./RecipePuppyController";
import getGif from "./GiphyController";

interface Recipe extends RecipePuppyResponse {
    gif: string,
}

interface RecipeResponse {
    keywords: string[],
    recipes: Recipe[],
}

export class GeneralError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    toJson = () => {
        return {
            status: this.status,
            message: this.message,
        }
    }
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

export const getRecipeList = async (keywords: string[]): Promise<RecipeResponse> => {
    if (!validateKeywords(keywords)) {
        throw new GeneralError(400, 'Please select up to 3 ingredients.');
    }

    let puppyRecipes: RecipePuppyResponse[] = [];
    const recipes: Recipe[] = [];

    await getPuppyRecipes(keywords)
        .then(response => puppyRecipes = response)
        .catch(() => {
            throw new GeneralError(503, 'Recipe Puppy is currently unavailable.');
        });

    await getRecipesGifs(puppyRecipes, recipes)
        .catch(() => {
            throw new GeneralError(503, 'Giphy is currently unavailable.');
        });

    return {
        keywords: keywords.sort(),
        recipes: recipes,
    };
};
