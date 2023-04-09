const express = require('express');
const app = express();
const process = require('process');


port = process.env.PORT || 3000;


app.get('/test/', (req, res) => {
    res.send('Jus testing');
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);




