const { initMatch, updatePlayers, updateTeams } = require('../state')
const { sendEmbed } = require('../webhook')

async function handleMatchStarted(body) {
  const { GamePassword, Players, Teams } = body

  initMatch(GamePassword)

  if (Players) updatePlayers(GamePassword, Players)
  if (Teams) updateTeams(GamePassword, Teams)

  await sendEmbed({
    title: 'Partido Iniciado',
    description: 'El partido ha comenzado!',
    color: 0x2ecc71 // green
  })
}

module.exports = { handleMatchStarted }
