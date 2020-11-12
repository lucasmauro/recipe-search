import sendGetRequest from './HttpRequestService';

const getGif = async (title: string): Promise<string> => {
    const key = process.env.GIPHY_API_KEY;
    const url = `http://api.giphy.com/v1/gifs/search?q=${title}&api_key=${key}&limit=1`
    return sendGetRequest(url).then((response: any) => {
        return response.data[0].images.original.url;
    });
};

export default getGif;
