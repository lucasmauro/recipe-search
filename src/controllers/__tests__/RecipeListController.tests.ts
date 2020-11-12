import {getRecipeList} from '../RecipeListController'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


let mock: MockAdapter;

const keywords = ['any', 'keyword', 'works'];
const giphyUrl = 'https://media.giphy.com/media/some_gif/giphy.gif';
const validMockRecipePuppyData = {
    results: [
        {title: 'Meal One', href: 'http://some-url.com/meal-one', ingredients: 'garlic, tomato, onion'},
        {title: 'Meal Two', href: 'http://some-url.com/meal-two', ingredients: 'wheat powder, beat, oil'},
    ]
};
const validMockGiphyData = {
    data: [
        {
            images: {
                original: {
                    url: giphyUrl,
                },
            },
        },
    ]
};
const validExpectedResponse = {
    keywords: keywords,
    recipes: [
        {
            title: 'Meal One',
            ingredients: ['garlic', 'onion', 'tomato'],
            link: 'http://some-url.com/meal-one',
            gif: giphyUrl
        },
        {
            title: 'Meal Two',
            ingredients: ['beat', 'oil', 'wheat powder'],
            link: 'http://some-url.com/meal-two',
            gif: giphyUrl
        }
    ]
};


beforeAll(() => {
    mock = new MockAdapter(axios);
});

test('Recipe List Controller returns expected result', async () => {
    mock.onGet(new RegExp('/.*recipepuppy.*/'))
        .reply(200, validMockRecipePuppyData);
    mock.onGet(new RegExp('/.*giphy.*/'))
        .reply(200, validMockGiphyData);

    let response;
    await getRecipeList(keywords)
        .then(resp => {
            response = resp;
        });

    expect(response).toEqual(validExpectedResponse);
});

test('Recipe List Controller verifies maximum number of keywords', async () => {
    mock.onGet(new RegExp('/.*recipepuppy.*/'))
        .reply(200, validMockRecipePuppyData);
    mock.onGet(new RegExp('/.*giphy.*/'))
        .reply(200, validMockGiphyData);

    await getRecipeList(['more', 'than', 'three', 'keywords'])
        .catch((error) => {
            expect(error.message).toEqual('Please select up to 3 ingredients.');
            expect(error.status).toEqual(400);
        });
});

test('Recipe List Controller handles Recipe Puppy inaccessibility', async () => {
    mock.onGet(new RegExp('/.*unreachable_recipepuppy.*/'))
        .reply(200, validMockRecipePuppyData);
    mock.onGet(new RegExp('/.*giphy.*/'))
        .reply(200, validMockGiphyData);

    await getRecipeList(keywords)
        .catch((error) => {
            expect(error.message).toEqual('Recipe Puppy is currently unavailable.');
            expect(error.status).toEqual(503);
        });
});

test('Recipe List Controller handles Giphy inaccessibility', async () => {
    mock.onGet(new RegExp('/.*recipepuppy.*/'))
        .reply(200, validMockRecipePuppyData);
    mock.onGet(new RegExp('/.*unreachable_giphy.*/'))
        .reply(200, validMockGiphyData);

    await getRecipeList(keywords)
        .catch((error) => {
            expect(error.message).toEqual('Giphy is currently unavailable.');
            expect(error.status).toEqual(503);
        });
});
