// Map<gamePassword, MatchState>
// MatchState = { captures: Map<playerName, count>, map: string, startedAt: Date }
const matches = new Map()

const TIMEOUT_MS = 2 * 60 * 60 * 1000 // 2 hours

function getMatch(gamePassword) {
  return matches.get(gamePassword)
}

function initMatch(gamePassword) {
  matches.set(gamePassword, {
    captures: new Map(),
    map: null,
    startedAt: new Date()
  })
}

function recordCapture(gamePassword, playerName, map) {
  let match = matches.get(gamePassword)
  if (!match) {
    initMatch(gamePassword)
    match = matches.get(gamePassword)
  }
  match.map = map
  const current = match.captures.get(playerName) || 0
  match.captures.set(playerName, current + 1)
}

function getMVP(gamePassword) {
  const match = matches.get(gamePassword)
  if (!match || match.captures.size === 0) return null

  let mvpName = null
  let maxCaptures = 0
  for (const [name, count] of match.captures) {
    if (count > maxCaptures) {
      maxCaptures = count
      mvpName = name
    }
  }
  return { name: mvpName, captures: maxCaptures }
}

function clearMatch(gamePassword) {
  matches.delete(gamePassword)
}

// Cleanup stale matches periodically
setInterval(() => {
  const now = Date.now()
  for (const [password, match] of matches) {
    if (now - match.startedAt.getTime() > TIMEOUT_MS) {
      matches.delete(password)
    }
  }
}, 10 * 60 * 1000) // check every 10 minutes

module.exports = { getMatch, initMatch, recordCapture, getMVP, clearMatch }
