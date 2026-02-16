const express = require('express')
const { PORT } = require('./config')
const { handleMatchStarted } = require('./handlers/match_started')
const { handleFlagCapture } = require('./handlers/flag_capture')
const { handleMatchEnded } = require('./handlers/match_ended')

const app = express()
app.use(express.json())

app.post('/', async (req, res) => {
  const event = req.body.Name

  try {
    switch (event) {
      case 'MATCHSTARTED':
        console.log(`MATCHSTARTED: ${req.body.GamePassword}`)
        await handleMatchStarted(req.body.GamePassword)
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

app.listen(PORT, () => {
  console.log(`ut99-webhook listening on port ${PORT}`)
})
