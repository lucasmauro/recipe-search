import sendGetRequest from './HttpRequestService';

export interface RecipePuppyResponse {
    title: string,
    ingredients: string[],
    link: string,
}

export const getPuppyRecipes = (keywords: string[]): Promise<RecipePuppyResponse[]> => {
    const endpoint = process.env.RECIPE_PUPPY_API_ENDPOINT;
    const url = `${endpoint}?i=${keywords}`;

    return sendGetRequest(url).then(response => {
        const recipes: RecipePuppyResponse[] = response.results.map((result: any) => {
            const {title, href, ingredients}: { title: string, href: string, ingredients: string } = result;

            const ingredientsList = ingredients.split(',')
                .map(item => {
                    return item.trim();
                })
                .sort();

            return {
                title: title,
                link: href,
                ingredients: ingredientsList,
            };
        });
        return recipes;
    });
};

