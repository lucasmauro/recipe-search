import getPuppyRecipes from "./RecipePuppyService";

export const getRecipeList = (keywords: string[]) => {
    return getPuppyRecipes(keywords).then(recipes => {
        return {
            keywords: keywords,
            recipes: recipes,
        }
    })
};

export default getRecipeList;
