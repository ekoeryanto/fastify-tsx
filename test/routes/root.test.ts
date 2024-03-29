import { expect } from 'vitest'
import { fastest } from '../context'

fastest('default root route', async ({ app }) => {
  const res = await app.inject({
    url: '/',
  })
  expect(JSON.parse(res.payload)).toMatchObject({ root: true })
})
