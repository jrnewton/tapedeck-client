'use strict';

const express = require('express');
const app = express();

app.use(express.static('./src/'));

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
