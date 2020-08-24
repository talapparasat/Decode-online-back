module.exports = {
  apps : [
   {
    name: 'jsrush',
    script: './server/server.js',
    env: {
      PORT: 5001,
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 5001,
      NODE_ENV: 'production'
    }
  }
]
};



