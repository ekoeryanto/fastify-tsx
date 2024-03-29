/* c8 ignore start */
import process from 'node:process'
// Read the .env file.
import loadEnv from 'dotenv-load'

// Require the framework
import Fastify from 'fastify'

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from '@pake/close-with-grace'

loadEnv()

const {
  HOST = '127.0.0.1',
  PORT = '3000',
  FASTIFY_CLOSE_GRACE_DELAY = '5000',
} = process.env
// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
})

// Register your application as a normal plugin.
app.register(import('./app'))

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: Number.parseInt(FASTIFY_CLOSE_GRACE_DELAY) },
  async function ({ signal, err, manual }) {
    app.log.info(`Received close signal ${signal}${manual ? ' manually' : ''}`)
    if (err)
      app.log.error(err)

    await app.close()
  } as closeWithGrace.CloseWithGraceAsyncCallback,
)

app.addHook('onClose', async () => {
  closeListeners.uninstall()
})

// Start listening.
app.listen(
  {
    host: HOST,
    port: Number.parseInt(PORT),
  },
  (err: any) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  },
)

/* c8 ignore end */
