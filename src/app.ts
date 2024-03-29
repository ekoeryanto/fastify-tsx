import type { FastifyPluginAsync } from 'fastify'

import fg from 'fast-glob'

const app: FastifyPluginAsync = async (
  fastify,
): Promise<void> => {
  const plugins = await fg(`./plugins/**/*.{ts,js}`, { cwd: import.meta.dirname })
  await Promise.all(
    plugins.map((plugin) => {
      plugin = plugin.replace(/\.ts$/, '.js')
      return fastify.register(import(plugin))
    }),
  )

  const routes = await fg(`./routes/**/*.{ts,js}`, { cwd: import.meta.dirname })
  await Promise.all(
    routes.map((route) => {
      route = route.replace(/\.ts$/, '.js')
      const module = route.replace(/(\/?[index]+)?\.js$/, '')
      let prefix = module.replace('./routes', '')
      if (prefix === '/root')
        prefix = '/'

      return fastify.register(import(route), { prefix })
    }),
  )
}

export default app
