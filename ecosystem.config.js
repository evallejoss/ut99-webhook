module.exports = {
  apps: [{
    name: 'ut99-webhook',
    script: 'src/server.js',
    env: { NODE_ENV: 'production' }
  }]
}
