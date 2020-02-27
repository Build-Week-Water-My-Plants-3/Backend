const server = require('./api/server.js');

const port = process.env.PORT || 5550;
server.listen(port, () => 
console.log(` ✨✨ Magic happening on port ${port}  ✨✨`)); 