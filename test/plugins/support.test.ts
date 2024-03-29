import { expect, it } from 'vitest'
import Fastify from 'fastify'
import Support from '../../src/plugins/support'

it('support works standalone', async () => {
  const fastify = Fastify()
  void fastify.register(Support)
  await fastify.ready()

  expect(fastify.someSupport()).eq('hugs')
})
