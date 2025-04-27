import React from 'react'
import '../../theme/styles.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Portfolio } from '@/payload-types'
export const generateMetadata = async () => {
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

  const portfolio = theme.portfolio as Portfolio

  return {
    description: portfolio.name,
    title: portfolio.name,
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" data-theme={'portfoly'} className="hide-scrollbar">
      <body>{children}</body>
    </html>
  )
}
