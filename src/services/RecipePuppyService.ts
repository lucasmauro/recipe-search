import sendGetRequest from './HttpRequestService';

interface RecipePuppyResponse {
    title: string,
    link: string,
    ingredients: string[],
}

const getPuppyRecipes = (keywords: string[]) => {
    let url = `http://www.recipepuppy.com/api/?i=${keywords}`;

    return sendGetRequest(url).then(response => {
        let recipes: RecipePuppyResponse[];

        recipes = response.results.map((result: any) => {
            let {title, href, ingredients}: { title: string, href: string, ingredients: string } = result;

            let ingredientsList = ingredients.split(',')
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

export default getPuppyRecipes;
