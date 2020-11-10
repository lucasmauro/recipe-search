import {getPuppyRecipes, RecipePuppyResponse} from "./RecipePuppyService";
import getGif from "./GiphyService";

interface Recipe extends RecipePuppyResponse {
    gif: string,
}

export interface RecipeResponse {
    keywords: string[],
    recipes: Recipe[],
}

export const getRecipeList = async (keywords: string[]) => {
    let puppyRecipes: RecipePuppyResponse[] = [];
    let recipes: Recipe[] = [];

    await getPuppyRecipes(keywords)
        .then(response => {
            puppyRecipes = response;
        });

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

    let recipesResponse: RecipeResponse = {
        keywords: keywords.sort(),
        recipes: recipes,
    }

    return recipesResponse;
};
