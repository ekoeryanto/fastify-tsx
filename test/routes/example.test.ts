import { expect } from 'vitest'
import { fastest } from '../context'

fastest('example is loaded', async ({ app }) => {
  const res = await app.inject({
    url: '/example',
  })

  expect(res.payload).eq('this is an example')
})
