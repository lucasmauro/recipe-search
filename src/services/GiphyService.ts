import sendGetRequest from './HttpRequestService';

const getGif = async (title: string) => {
    let key = '';
    let url = `http://api.giphy.com/v1/gifs/search?q=${title}&api_key=${key}&limit=1`
    return sendGetRequest(url).then(response => {
        return response.data[0].images.original.url;
    });
};

export default getGif;
