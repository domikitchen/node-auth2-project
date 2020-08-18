require('dotenv').config();

const server = require('./api/sever.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server go NYOOM ${port}`));