module.exports = {
  apps : [
    {
      name: "printer",
      script: "./server/printer.js",
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