import axios from "axios";

const sendGetRequest = (url: string) => {
    return axios({
        url: url,
        method: 'get'
    }).then(response => {
        return response.data;
    })
};

export default sendGetRequest;
