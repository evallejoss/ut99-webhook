const { initMatch } = require('../state')
const { sendEmbed } = require('../webhook')

async function handleMatchStarted(gamePassword) {
  initMatch(gamePassword)

  await sendEmbed({
    title: 'Partido Iniciado',
    description: 'El partido ha comenzado!',
    color: 0x2ecc71 // green
  })
}

module.exports = { handleMatchStarted }
