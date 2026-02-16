# ut99-webhook

Script independiente que recibe eventos de un servidor UT99 vía HTTP POST y envía notificaciones de estadísticas a Discord mediante webhooks.

Sin ELO, sin base de datos, sin bans. Solo estadísticas del partido en tiempo real.

## Eventos soportados

| Evento | Acción |
|---|---|
| `MATCHSTARTED` | Envía embed de inicio de partido |
| `FLAGCAPTURE` | Notifica captura de bandera con score, tiempo restante y mapa. Acumula stats para MVP |
| `MATCHENDED` | Envía resultado final con equipos, score y MVP del partido |
| `WAITINGPLAYERS` / `WAITINGPLAYERSEND` | Ignorados |

## Requisitos

- Node.js 18+

## Instalación

```bash
git clone git@github.com:evallejoss/ut99-webhook.git
cd ut99-webhook
npm install
cp .env.example .env
```

Editar `.env` con tu webhook de Discord:

```
PORT=9998
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/TU_WEBHOOK_ID/TU_WEBHOOK_TOKEN
```

## Uso

```bash
node src/server.js
```

### Con PM2

```bash
pm2 start ecosystem.config.js
```

## Verificación

```bash
# Inicio de partido
curl -X POST http://localhost:9998 -H "Content-Type: application/json" \
  -d '{"Name":"MATCHSTARTED","GamePassword":"test123"}'

# Captura de bandera
curl -X POST http://localhost:9998 -H "Content-Type: application/json" \
  -d '{"Name":"FLAGCAPTURE","Teams":{"Red":{"Score":1},"Blue":{"Score":0}},"Players":[{"Name":"Player1","Id":1,"Team":0,"Password":"pwd1"}],"InstigatorId":1,"RemainingTime":600,"Map":"CTF-Face","GamePassword":"test123"}'

# Fin de partido
curl -X POST http://localhost:9998 -H "Content-Type: application/json" \
  -d '{"Name":"MATCHENDED","Teams":{"Red":{"Score":3},"Blue":{"Score":2}},"Players":[{"Name":"Player1","Id":1,"Team":0},{"Name":"Player2","Id":2,"Team":1}],"GamePassword":"test123"}'
```
