require("dotenv").config()
const PORT = process.env.PORT || 3001

const server = require("./src/app.js");

server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`); // eslint-disable-line no-console
});