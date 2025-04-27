import React from 'react'
import { NavbarSegmentBlock, Portfolio, Theme } from '@/payload-types'
import NextLink from 'next/link'

type NavbarSegmentComponentProps = {
  segment: NavbarSegmentBlock
  theme: Theme
}

const NavbarSegmentComponent = ({ segment, theme }: NavbarSegmentComponentProps) => {
  const portfolio = theme.portfolio as Portfolio

  return (
    <div className="navbar bg-base-100 shadow-sm px-2">
      <div className="container mx-auto flex flex-row w-full items-center justify-between">
        <NextLink href="/" className="btn btn-ghost text-xl">
          {portfolio.name}
        </NextLink>
        <div>
          {segment.call_to_action && (
            <>
              {segment.call_to_action.length > 0 && (
                <NextLink
                  href={segment.call_to_action[0].url}
                  target="_blank"
                  className="btn btn-secondary btn-md btn-soft"
                >
                  {segment.call_to_action[0].text}
                </NextLink>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavbarSegmentComponent
