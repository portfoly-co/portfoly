import React from 'react'
import { Portfolio, Image, Theme, HeaderSegmentBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

type HeaderSegmentComponentProps = {
  segment: HeaderSegmentBlock
  theme: Theme
}

const HeaderSegmentComponent = ({ segment, theme }: HeaderSegmentComponentProps) => {
  const portfolio = theme.portfolio as Portfolio

  return (
    <header
      id="aboutme"
      className="container mx-auto py-12 grid lg:grid-cols-2 w-full items-center px-2 gap-12"
    >
      <div className="order-2 lg:order-1 flex flex-col items-start justify-center w-full">
        {segment.greeting && (
          <RichText className="prose text-lg text-base-content" data={segment.greeting} />
        )}
        {segment.about && (
          <RichText className="prose mt-6 text-lg text-base-content" data={segment.about} />
        )}
        {segment.call_to_action && (
          <>
            {segment.call_to_action.length > 0 && (
              <Link
                href={segment.call_to_action[0].url}
                target="_blank"
                className="btn btn-primary btn-lg mt-6 btn-soft"
              >
                {segment.call_to_action[0].text}
              </Link>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-center justify-center order-1 lg:order-2">
        {portfolio.image && (
          <img
            className="aspect-square rounded-full border-2 border-primary max-w-48 lg:max-w-96 w-full object-cover"
            alt="profile image"
            src={(portfolio.image as Image).url!}
          />
        )}
      </div>
    </header>
  )
}

export default HeaderSegmentComponent
