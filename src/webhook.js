const { DISCORD_WEBHOOK_URL } = require('./config')

async function sendEmbed(embed) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('DISCORD_WEBHOOK_URL not configured, skipping webhook')
    return
  }

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    })

    if (!res.ok) {
      console.error(`Discord webhook error: ${res.status} ${res.statusText}`)
    }
  } catch (err) {
    console.error('Failed to send Discord webhook:', err.message)
  }
}

module.exports = { sendEmbed }
