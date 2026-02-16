const { getMVP, clearMatch } = require('../state')
const { sendEmbed } = require('../webhook')

const RED_DOT = '\ud83d\udd34'
const BLUE_DOT = '\ud83d\udd35'

async function handleMatchEnded(score) {
  const { Teams, Players, GamePassword } = score

  if (!Teams || !Teams.Red || !Teams.Blue) return

  const redScore = Teams.Red.Score
  const blueScore = Teams.Blue.Score

  // Determine winner
  let winnerText
  let color
  if (redScore > blueScore) {
    winnerText = 'ROJO'
    color = 0x992d22 // dark red
  } else if (blueScore > redScore) {
    winnerText = 'AZUL'
    color = 0x2d5f8a // dark blue
  } else {
    winnerText = 'EMPATE'
    color = 0x95a5a6 // grey
  }

  // Build player lists by team
  const redPlayers = Players.filter(p => p.Team === 0).map(p => p.Name)
  const bluePlayers = Players.filter(p => p.Team === 1).map(p => p.Name)

  // Bold the winning score
  const redDisplay = redScore > blueScore ? `**${redScore}**` : `${redScore}`
  const blueDisplay = blueScore > redScore ? `**${blueScore}**` : `${blueScore}`

  // MVP
  const mvp = getMVP(GamePassword)
  const mvpText = mvp ? `\n\nMVP: **${mvp.name}** (${mvp.captures} captura${mvp.captures > 1 ? 's' : ''})` : ''

  await sendEmbed({
    title: winnerText === 'EMPATE' ? 'Partido Finalizado - Empate' : `Partido Finalizado - Gana ${winnerText}`,
    fields: [
      {
        name: 'Resultado',
        value: `${RED_DOT} ${redDisplay} - ${blueDisplay} ${BLUE_DOT}`
      },
      {
        name: `${RED_DOT} Equipo Rojo`,
        value: redPlayers.length > 0 ? redPlayers.join(' \u25aa\ufe0f ') : 'Sin jugadores',
        inline: true
      },
      {
        name: `${BLUE_DOT} Equipo Azul`,
        value: bluePlayers.length > 0 ? bluePlayers.join(' \u25aa\ufe0f ') : 'Sin jugadores',
        inline: true
      }
    ],
    description: mvpText,
    color
  })

  clearMatch(GamePassword)
}

module.exports = { handleMatchEnded }
