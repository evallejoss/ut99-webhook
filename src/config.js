require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 9998,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL
}
