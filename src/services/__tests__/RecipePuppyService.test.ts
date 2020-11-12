import {getPuppyRecipes, RecipePuppyResponse} from '../RecipePuppyService'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let expectedResponse: RecipePuppyResponse[];

beforeAll(() => {
    const mock = new MockAdapter(axios);
    const mockData = {
        results: [
            {title: 'Meal One', href: 'http://some-url.com/meal-one', ingredients: 'garlic, tomato, onion'},
            {title: 'Meal Two', href: 'http://some-url.com/meal-two', ingredients: 'wheat powder, beat, oil'},
        ]
    };

    mock.onGet(new RegExp('/*/'))
        .reply(200, mockData);

    expectedResponse = [
        {title: 'Meal One', link: 'http://some-url.com/meal-one', ingredients: ['garlic', 'onion', 'tomato']},
        {title: 'Meal Two', link: 'http://some-url.com/meal-two', ingredients: ['beat', 'oil', 'wheat powder']},
    ];
});

test('Recipe Puppy Controller returns ingredients in alphabetical order', async () => {
    const keywords = ['some', 'ingredient'];
    let response: RecipePuppyResponse[] = [];
    await getPuppyRecipes(keywords)
        .then((resp: RecipePuppyResponse[]) => response = resp);
    expect(response).toEqual(expectedResponse);
});
