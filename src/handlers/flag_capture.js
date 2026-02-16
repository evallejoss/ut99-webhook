const { recordCapture } = require('../state')
const { sendEmbed } = require('../webhook')

// Unicode emoji fallbacks (custom Discord emojis won't work in webhooks)
const RED_DOT = '\ud83d\udd34'
const BLUE_DOT = '\ud83d\udd35'

async function handleFlagCapture(capture) {
  const { Teams, Players, InstigatorId, RemainingTime, Map: mapName, GamePassword } = capture

  if (InstigatorId === undefined) return

  const player = Players.find(p => p.Id === InstigatorId)
  if (!player) return

  const team = player.Team === 0 ? 'RED' : 'BLUE'
  const teamLabel = team === 'RED' ? 'ROJO' : 'AZUL'

  recordCapture(GamePassword, player.Name, mapName)

  const minutes = String(Math.floor(RemainingTime / 60)).padStart(2, '0')
  const seconds = String(RemainingTime % 60).padStart(2, '0')

  await sendEmbed({
    fields: [{
      name: `${RED_DOT} ${Teams.Red.Score} - ${Teams.Blue.Score} ${BLUE_DOT}  [${minutes}:${seconds}]`,
      value: `**${player.Name}** captur\u00f3 la bandera para el equipo ${teamLabel} (${mapName})`
    }],
    color: team === 'RED' ? 0xe74c3c : 0x3498db
  })
}

module.exports = { handleFlagCapture }
