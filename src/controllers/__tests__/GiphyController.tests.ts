import getGif from "../GiphyController";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let expectedResponse: string;

beforeAll(() => {
    const url = 'https://media.giphy.com/media/some_gif/giphy.gif';
    const mock = new MockAdapter(axios);
    const mockData = {
        data: [
            {
                images: {
                    original: {
                        url: url,
                    },
                },
            },
        ]
    };

    mock.onGet(new RegExp('/*/'))
        .reply(200, mockData);

    expectedResponse = url;
});

test('Recipe Puppy Controller returns ingredients in alphabetical order', async () => {
    let response = '';
    await getGif('Any Title')
        .then(gif => {
            response = gif;
        })

    expect(response).toEqual(expectedResponse);
});