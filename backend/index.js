const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const starWarsApp = path.join(__dirname, '../build');

app.use(express.static(starWarsApp));

app.listen(port, () => {
  console.log(`App listening at ${port}`)
})