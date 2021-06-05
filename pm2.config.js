module.exports = {
  apps : [
    {
      name: "voicer",
      script: "./server/server.js",
      watch: true,

      env: {
        "PORT": 8081,
        "SSLPORT": 443,
        "DOMAIN": "localhost",
        "PROTOCOL": "https"
      }
    }
  ]
}