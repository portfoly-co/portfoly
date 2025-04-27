import React from 'react'
import { ContactSegmentBlock, Portfolio, Theme } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

import EmailIcon from '../icons/EmailIcon'
import PhoneIcon from '../icons/PhoneIcon'
import LinkIcon from '../icons/LinkIcon'
import Link from '@/components/Link'

type ContactSegmentComponentProps = {
  segment: ContactSegmentBlock
  theme: Theme
}

const ContactSegmentComponent = ({ segment, theme }: ContactSegmentComponentProps) => {
  const portfolio = theme.portfolio as Portfolio

  return (
    <section
      id="contact"
      className="container mx-auto py-12 grid lg:grid-cols-2 w-full items-start px-2 gap-12"
    >
      {segment.title && (
        <div className="flex flex-col items-center w-full">
          <RichText className="prose text-lg text-base-content" data={segment.title} />
        </div>
      )}
      <div className="bg-base-200 p-6 overflow-hidden flex flex-col rounded-box border border-base-300">
        <ul className="flex flex-col items-start gap-4">
          {portfolio.links &&
            portfolio.links.map((link, index) => {
              return (
                <li key={index} className="flex flex-row items-center w-full">
                  {link.type == 'internal' && <LinkIcon className="w-4 h-4" />}
                  {link.type == 'external' && <LinkIcon className="w-4 h-4" />}
                  {link.type == 'email' && <EmailIcon className="w-4 h-4" />}
                  {link.type == 'phone' && <PhoneIcon className="w-4 h-4" />}
                  <Link className="link link-hover ml-2" link={link} />
                </li>
              )
            })}
        </ul>
      </div>
    </section>
  )
}

export default ContactSegmentComponent
