import React from 'react'
import { FooterSegmentBlock, Portfolio, Theme } from '@/payload-types'
import Link from '@/components/Link'

type FooterComponentProps = {
  segment: FooterSegmentBlock
  theme: Theme
}

const FooterComponent = ({ segment, theme }: FooterComponentProps) => {
  const portfolio = theme.portfolio as Portfolio

  return (
    <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content p-4 pt-6">
      <nav className="flex flex-wrap items-center justify-center gap-4">
        {portfolio.links &&
          portfolio.links.map((link, index) => {
            return <Link key={index} className="link link-hover whitespace-nowrap" link={link} />
          })}
      </nav>
      {segment.text && (
        <nav>
          <p>{segment.text}</p>
        </nav>
      )}
    </footer>
  )
}

export default FooterComponent
