const express = require('express')
const { PORT } = require('./config')
const { handleMatchStarted } = require('./handlers/match_started')
const { handleFlagCapture } = require('./handlers/flag_capture')
const { handleMatchEnded } = require('./handlers/match_ended')
const { getAllMatches, getMatch } = require('./state')

const app = express()
app.use(express.json())

app.post('/', async (req, res) => {
  const event = req.body.Name

  try {
    switch (event) {
      case 'MATCHSTARTED':
        console.log(`MATCHSTARTED: ${req.body.GamePassword}`)
        await handleMatchStarted(req.body)
        break
      case 'FLAGCAPTURE':
        console.log(`FLAGCAPTURE: ${req.body.GamePassword}`)
        await handleFlagCapture(req.body)
        break
      case 'MATCHENDED':
        console.log(`MATCHENDED: ${req.body.GamePassword}`)
        await handleMatchEnded(req.body)
        break
      default:
        console.log(`Ignored event: ${event}`)
    }
  } catch (err) {
    console.error(`Error handling ${event}:`, err)
  }

  res.send()
})

function serializeMatch(match) {
  return {
    gamePassword: match.gamePassword,
    map: match.map,
    startedAt: match.startedAt,
    teams: match.teams,
    players: match.players,
    captures: Object.fromEntries(match.captures)
  }
}

app.get('/api/matches', (req, res) => {
  const all = getAllMatches()
  res.json({
    active: all.length > 0,
    matches: all.map(serializeMatch)
  })
})

app.get('/api/matches/:gamePassword', (req, res) => {
  const match = getMatch(req.params.gamePassword)
  if (!match) {
    return res.status(404).json({ error: 'Match not found' })
  }
  res.json(serializeMatch(match))
})

app.listen(PORT, () => {
  console.log(`ut99-webhook listening on port ${PORT}`)
})
