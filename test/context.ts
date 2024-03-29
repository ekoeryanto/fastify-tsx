import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
import { test } from 'vitest'

export const fastest = test.extend<{ app: FastifyInstance }>({
  // eslint-disable-next-line unused-imports/no-unused-vars
  app: async ({ task }, use) => {
    const app = fastify()
    app.register(import('../src/app'))
    await use(app)
    await app.close()
  },
})
