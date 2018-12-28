const path = require('path');

module.exports = {
  webpack: {
    resolve: {    
      alias: {
        Loading: path.resolve(__dirname, './src/Loading.js'),
      },
    },
    devServer: {
      open: true,
      port: 8888,
    },
  },
  // envs: {
  //   API: 'http://localhost',
  //   TEST: 'ss',
  // },  
};
