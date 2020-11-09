import express from 'express';

const app = express();

app.get('/recipes', (request, response) => {
    response.json({
        message: 'OK',
    });
});

app.listen(3333);
