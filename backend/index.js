const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        "evento": 'semana omnistack',
        "aluno": 'leonardo may'
    });
});

app.listen(3333);