import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import PortfolioPage from '../../theme/views/portfolio'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const themes = await payload.find({
    collection: 'themes',
    limit: 1,
    where: {
      active: {
        equals: true,
      },
    },
  })

  const theme = themes.totalDocs > 0 ? themes.docs[0] : null

  if (!theme) {
    return notFound()
  }

  return <PortfolioPage theme={theme} />
}
