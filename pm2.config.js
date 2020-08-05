module.exports = {
  apps : [
    {
      name: "pfstore",
      script: "./server/server.js",
      watch: true,

      env: {
        "PORT": 8080,
        "SSLPORT": 443,
        "DOMAIN": "localhost",
        "PROTOCOL": "https"
      }
    }
  ]
}