const cluster = require('cluster');
    if (cluster.isMaster) {
      require('./main.js'); // your electron main file
      cluster.fork(); 
    } else {
      require('./serverNode/server.js'); // your server code
    }